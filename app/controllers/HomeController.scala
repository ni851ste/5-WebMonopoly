package controllers

import de.htwg.se.monopoly.controller.{Controller, GameStatus}
import de.htwg.se.monopoly.util.Observer
import de.htwg.se.monopoly.view.Tui
import de.htwg.se.monopoly.controller.GameStatus
import javax.inject._
import play.api.mvc._

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc)
{

    val controller: Controller = new Controller()
    controller.controllerState = GameStatus.START_OF_TURN

    val tui: Tui = new Tui(controller)

    var monopolyAsString: String = ""
    controller.add(new Observer
    {
        override def update(): Unit =
        {
            Ok(getCurrentMessageWeb())
        }
    })

    def printState() = Action
    {
        implicit request: Request[AnyContent] =>
            controller.notifyObservers()
            Ok(views.html.game(controller, this))
    }

    def printStateWithInput(input: String) = Action
    {
        implicit request: Request[AnyContent] =>
            print("HAAAALP   " + controller.controllerState + "    " + input + "\n")
            processInput(input)
            controller.notifyObservers()
            Ok(views.html.game(controller, this))
    }

    private def processInput(input: String) =
    {

        if (input.equals("q")) System.exit(0)

        print("\n############ " + controller.controllerState + "---" + input + "\n")
        controller.controllerState match
        {
            case GameStatus.START_OF_TURN => input match
            {
                case "r" => val (d1, d2) = controller.rollDice()
                    controller.processRoll(d1, d2)
            }

            case GameStatus.CAN_BUILD =>
                if (input.equals("e"))
                {
                    controller.nextPlayer()
                }
                else
                {
                    val args = input.split("_")
                    controller.tryToBuildHouses(args(0), args(1).toInt)

                }

            //                if (args.length != 2) {
            //                    controller.buildStatus = GameStatus.BuildStatus.INVALID_ARGS
            //                }
            //                else {
            //                }
        }
    }

    def rules = Action
    {
        implicit request: Request[AnyContent] =>
            Ok(views.html.rules());
    }

    def getCurrentMessageWeb(): String =
    {
        controller.controllerState match
        {
            case GameStatus.START_OF_TURN => "Start your turn by rolling the dice."
            case GameStatus.CAN_BUILD =>
                controller.buildStatus match
                {
                    case GameStatus.BuildStatus.DEFAULT =>
                        "Rolled " + controller.currentDice + "\nNow on " + controller.getCurrentField.getName + ".\nYou can build houses."
                    case GameStatus.BuildStatus.BUILT => "Succesfully build house"
                }


            case _ => "Unknown gamestate"
        }
    }
}
