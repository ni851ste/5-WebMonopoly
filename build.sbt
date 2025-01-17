name := """WebMonopoly"""
organization := "Wde.htwg.se"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.12.8"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "4.0.3" % Test
libraryDependencies += "org.scala-lang.modules" % "scala-swing_2.12" % "2.0.3"
unmanagedBase := baseDirectory.value / "lib"
// Adds additional packages into Twirl
//TwirlKeys.templateImports += "Wde.htwg.se.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "Wde.htwg.se.binders._"
