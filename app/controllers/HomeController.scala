package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.streams.ActorFlow
import akka.actor.ActorSystem
import akka.stream.Materializer
import akka.actor._
import de.htwg.se.monopoly.controller.{Controller, GameStatus, UpdateInfo}
import de.htwg.se.monopoly.view.Tui

import scala.swing.Reactor


/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(cc: ControllerComponents)(implicit system: ActorSystem, mat: Materializer) extends AbstractController(cc) {


    val controller: Controller = new Controller()
    controller.controllerState = GameStatus.START_OF_TURN

    val tui: Tui = new Tui(controller)

    var monopolyAsString: String = ""
    /*controller.add(new Observer {
        override def update(): Unit = {
            Ok(getCurrentMessageWeb())
        }
    })*/

    def printState() = Action {
        implicit request: Request[AnyContent] =>
            controller.publish(new UpdateInfo)
            Ok(views.html.game(controller, this))
    }

    def printStateWithInput(input: String) = Action {
        implicit request: Request[AnyContent] =>
            print("HAAAALP   " + controller.controllerState + "    " + input + "\n")
            processInput(input)
            controller.publish(new UpdateInfo)
            Ok(controller.getJSON())
    }

    private def processInput(input: String) = {

        if (input.equals("q")) System.exit(0)

        print("\n############ " + controller.controllerState + " --- " + input + "\n")
        controller.controllerState match {
            case GameStatus.START_OF_TURN => input match {
                case "r" => val (d1, d2) = controller.rollDice()
                    controller.processRoll(d1, d2)
            }

            case GameStatus.CAN_BUILD =>
                if (input.equals("e")) {
                    controller.nextPlayer()
                }
                else {
                    controller.tryToBuildHouses(input, 1)

                }
        }
        getCurrentGameJson()
    }

    def rules = Action {
        implicit request: Request[AnyContent] =>
            Ok(views.html.rules());
    }

    def getCurrentGameMessage(): Action[AnyContent] = Action {
        Ok(getCurrentMessageWeb())
    }

    def getCurrentMessageWeb(): String = {
        controller.controllerState match {
            case GameStatus.START_OF_TURN => "Start your turn by rolling the dice."
            case GameStatus.CAN_BUILD =>
                controller.buildStatus match {
                    case GameStatus.BuildStatus.DEFAULT =>
                        "Rolled " + controller.currentDice + "\nNow on " + controller.getCurrentField.getName + ".\nYou can build houses."
                    case GameStatus.BuildStatus.BUILT => "Successfully build house"
                }


            case _ => "Unknown gamestate"
        }
    }

    def getCurrentGameJson(): Action[AnyContent] = Action {
        Ok(controller.getJSON())
    }

    def socket = WebSocket.accept[String, String] { request =>
        ActorFlow.actorRef{ out : ActorRef =>
            println("Connect received")
            MonopolyWebSocketActor.props(out)
        }
    }

    object MonopolyWebSocketActor {
        def props(out: ActorRef) = Props(new MonopolyWebSocketActor(out))
    }

    class MonopolyWebSocketActor(out: ActorRef) extends Actor with Reactor {
        listenTo(controller)

        def receive = {
            case msg: String =>
                out ! (controller.getJSON().toString())
                println("Sent Json to Client" + msg)
        }

        reactions += {
            case event: UpdateInfo => sendJsonToClient
        }

        def sendJsonToClient = {
            println("Received event from Controller")
            out ! (controller.getJSON().toString())
        }
    }

}
