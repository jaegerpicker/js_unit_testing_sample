/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function(req, res, next) {
		var params = req.params.all();

		User.create(params, function(err, user) {
			if(err) {
				return next(err);
			}
			res.status(201);
			res.json(user);
		})
	},
	find: function(req, res, next) {
		var id = req.param('id');
		var idShortCut = isShortcut(id);
		if(idShortCut === true) {
			return next();
		}

		if(id) {
			User.findOne(id, function(err, user) {
				if(user === undefined) {
					return res.notFound();
				}
				if(err) {
					return next(err);
				}
				res.json(user);
			});
		} else {
			var where = req.param('where');
			if(_.isString(where)) {
				where = JSON.parse(where);
			}

			var options = {
				limit: req.param('limit') || undefined,
				skip: req.param('skip') || undefined,
				sort: req.param('sort') || undefined,
				where: where || undefined
			};
			console.log("Options: ", options);
			User.find(options, function(err, user) {
				if(user === undefined) {
					return res.notFound();
				}
				if(err) {
					return next(err);
				}
				res.json(user);
			});
		}
		function isShortcut(id) {
			if(id === 'find' || id === 'update' || id === 'create' || id === 'destroy') {
				return true;
			}
		}
	}

};
