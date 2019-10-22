package controllers

import de.htwg.se.monopoly.Monopoly
import de.htwg.se.monopoly.controller.Controller
import de.htwg.se.monopoly.view.Tui
import javax.inject._
import play.api._
import play.api.mvc._

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {


    var tui: Tui = null
    /**
     * Create an Action to render an HTML page.
     *
     * The configuration in the `routes` file means that this method
     * will be called when the application receives a `GET` request with
     * a path of `/`.
     */
    def index() = Action { implicit request: Request[AnyContent] =>
        Ok(views.html.index())
    }

    def hello() = Action {
        Ok("WHY HELLO THERE")
    }

    def playGame()  = Action {

        val controller = new Controller()
        tui = new Tui(controller)

        Ok("Game started")
    }

    def input(input: String) = Action {
        tui.processInput(input)

        Ok(input)
    }

}
