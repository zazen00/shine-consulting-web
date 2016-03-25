Router.map(function () {

	this.route("articles", {path: "articles", controller: "ArticlesController", where: "server"});
	this.route("articlesadmin", {path: "articlesAdmin", controller: "ArticlesadminController", where: "server"});
});
