package controllers

import de.htwg.se.monopoly.Monopoly
import de.htwg.se.monopoly.controller.{Controller, GameStatus}
import de.htwg.se.monopoly.util.Observer
import de.htwg.se.monopoly.view.Tui
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

    controller.add(new Observer {
        override def update(): Unit = {
            monopolyAsString = controller.currentGameMessage()
            //Ok(monopolyAsString)
        }
    })
    var monopolyAsString: String = ""


    def index() = Action { implicit request: Request[AnyContent] =>
        Ok(views.html.index())
    }

    def startGame(input: String): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
        print("INPUT: " + input)
        tui.processInput(input)
        Ok(monopolyAsString)
    }


}
