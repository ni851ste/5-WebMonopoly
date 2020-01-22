package controllers

import akka.actor.{ActorSystem, _}
import akka.stream.Materializer
import de.htwg.se.monopoly.controller.{GameStatus, IController}
import de.htwg.se.monopoly.controller.controllerBaseImpl.{Controller, UpdateInfo}
import javax.inject._
import play.api.libs.json.{JsObject, Json}
import play.api.libs.streams.ActorFlow
import play.api.mvc._

import scala.swing.Reactor


/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(cc: ControllerComponents)(implicit system: ActorSystem, mat: Materializer) extends AbstractController(cc) {


    val controller: IController = new Controller()
    controller.setUp

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
            Ok(controller.getJSON)

    }

    private def processInput(input: String) = {

        if (input.equals("q")) {
            controller.setUp
            controller.buildStatus = DEFAULT
            controller.buildStatus = GameStatus.BuildStatus.DEFAULT
        } else {
            print("\n############ " + controller.controllerState + " --- " + input + "\n")
            controller.controllerState match {
                case GameStatus.START_OF_TURN => input match {
                    case "r" => controller.rollDice
                }
                case GameStatus.CAN_BUILD =>
                    if (input.equals("e")) {
                        controller.nextPlayer
                    }
                    else {
                        controller.buildHouses(input, 1)
                    }
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
                    case GameStatus.BuildStatus.MISSING_MONEY =>
                        "You don't have enough money to build a house on " + controller.getCurrentField.getName
                    case GameStatus.BuildStatus.TOO_MANY_HOUSES =>
                        "You can only build 5 houses per Street"
                    case GameStatus.BuildStatus.BUILT => "Successfully built house"
                }


            case _ => "Unknown gamestate"
        }
    }

    def getCurrentGameJson(): Action[AnyContent] = Action {
        Ok(controller.getJSON)
    }

    def socket = WebSocket.accept[String, String] { request =>
        ActorFlow.actorRef { out: ActorRef =>
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
                println("RECEIVED IN SERVER: " + msg)
                msg match {
                    case "json" => // just send json
                    case _ => processInput(msg)
                }
                sendJsonToClient
        }

        reactions += {
            case event: UpdateInfo => sendJsonToClient
        }

        def sendJsonToClient = {
            println("Received event from Controller")
            val json = controller.getJSON.as[JsObject] + ("msg" -> Json.toJson(getCurrentMessageWeb()))
            println("Sending to websocket: " + play.api.libs.json.Json.prettyPrint(json))
            out ! (json.toString())
        }
    }

}
