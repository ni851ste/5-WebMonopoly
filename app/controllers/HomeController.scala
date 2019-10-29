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
@Singleton
class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

    val controller: Controller = new Controller()
    controller.controllerState = GameStatus.START_OF_TURN

    val tui: Tui = new Tui(controller)

    var monopolyAsString: String = ""
    controller.add(new Observer {
        override def update(): Unit = {
            monopolyAsString = controller.getCurrentGameMessage()
            Ok(monopolyAsString)
        }
    })

    def printState() = Action { implicit request: Request[AnyContent] =>
        controller.notifyObservers()
        Ok(views.html.game(controller))
    }

    def printStateWithInput(input: String) = Action { implicit request: Request[AnyContent] =>
        processInput(input)
        controller.notifyObservers()
        Ok(views.html.game(controller))
    }

    private def processInput(input: String) = {

        if (input.equals("q")) System.exit(0)

        controller.controllerState match {

            case GameStatus.START_OF_TURN =>
                input match {
                    case "r" => val (d1, d2) = controller.rollDice()
                        controller.processRoll(d1, d2)
                }

            case GameStatus.CAN_BUILD =>
                if (input.equals("e")) controller.nextPlayer()
                val args = input.split("_")
                if (args.length != 2) {
                    controller.buildStatus = GameStatus.BuildStatus.INVALID_ARGS
                }
                else {
                    controller.tryToBuildHouses(args(0), args(1).toInt)
                }
        }
    }

    def rules = Action { implicit request: Request[AnyContent] =>
        Ok(views.html.rules());
    }
}
