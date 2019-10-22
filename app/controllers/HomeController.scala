package controllers

import de.htwg.se.monopoly.Monopoly
import de.htwg.se.monopoly.controller.Controller
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

    val controller: Controller = Monopoly.controller
    val tui : Tui = Monopoly.tui
    controller.add(new Observer {
        override def update(): Unit = {
            rummyAsString = controller.currentGameMessage()
        }
    })
    var rummyAsString: String = ""


    def index() = Action { implicit request: Request[AnyContent] =>
        Ok(views.html.index())
    }

    def startGame(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
        tui.processInput(request.getQueryString("input").getOrElse("ndkahbfhdfsdbfhm"))
            Ok(rummyAsString)
    }





}
