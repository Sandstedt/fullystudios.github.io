// Init all code on document eady
function ready(fn) {
	if (document.readyState != 'loading') {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}
ready(function(){

	// Initialize barba.js
	Barba.Pjax.start();


	// simple fade animation
	var FadeTransition = Barba.BaseTransition.extend({
		/**
		 * [start function]
		 *
		 * This function is automatically called as soon the Transition starts
		 * this.newContainerLoading is a Promise for the loading of the new container
		 * (Barba.js also comes with an handy Promise polyfill!)
	
		 */
		start: function() {
			// As soon the loading is finished and the old page is faded out, let's fade the new page
			Promise
				.all([this.newContainerLoading, this.animOut()])
				.then(this.animIn.bind(this));
		},

		/**
		 * [animOut transition]
		 * @return { promise }
		 */
		animOut: function() {

			var deferred = Barba.Utils.deferred();

			/**
			 * Animate out the old container 
			 * this.oldContainer is the HTMLElement of the old Container
			 */
			TweenMax.to(this.oldContainer, 0.2, {
				opacity: 0,
				onComplete: function() {
					deferred.resolve();
				}
			});

			return deferred.promise;
		},
		/**
		 * [animIn transition]
		 * @return { promise }
		 */
		animIn: function() {
			var _this = this;
			var newCont = this.newContainer;

			// Hide the old container
			this.oldContainer.style.display = "none";

			// Set the new container's start values
			TweenMax.set(newCont, { visibility: 'visible', opacity:0 });

			// Animate in the new container
			TweenMax.to(newCont, 0.2, {
				opacity: 1,
				onComplete: function() {
					// .done() will automatically remove the old Container from the DOM 
					_this.done();
				}
			});
		}
	});

	/**
	 * Tell Barba to use the FadeTransition
	 */
	Barba.Pjax.getTransition = function() {
		/**
		* Here you can use your own logic!
		* For example you can use different Transition based on the current page or link...
		*/

		return FadeTransition;
	};

});