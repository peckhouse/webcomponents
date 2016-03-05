//============================================================
//
// Module JS: peck-tooltip
//
// @description
//   Javacript for a tooltip using Polymer.js
// @version 0.0.1
//
// @author L.Prandi
//
//============================================================

Polymer({
  is: 'peck-tooltip',

  properties: {
    /**
     * HTML id element to refer to display the tooltip
     *
     * @attribute for
     * @type string
     * @default 'tip'
     */
    for: {
      value: 'tip',
      reflectToAttribute: true
    },

    /**
     * Action to trigger the tooltip (hover or click)
     *
     * @attribute listener
     * @type string
     * @default 'hover'
     */
    action: {
      value: 'hover',
      reflectToAttribute: true
    },

    /**
     * Positions of the tooltip to its content
     *
     * @attribute position
     * @type string
     * @default 'bottom'
     */
    position: {
      value: 'bottom',
      reflectToAttribute: true
    },

    /**
     * Distance to the trigger element of the tooltip
     *
     * @attribute distanceToElement
     * @type int
     * @default 10
     */
    distanceToElement: {
      value: 10,
      reflectToAttribute: true
    },

    /**
     * animation style for the tooltip
     *
     * @attribute animation
     * @type String
     * @default 'fade'
     */
    animation: {
      value: 'fade',
      reflectToAttribute: true
    },

    /**
     * Indicate if there is an arrow to the tooltip
     *
     * @attribute animation
     * @type Boolean
     * @default false
     */
    arrow: {
      value: false,
      reflectToAttribute: true
    },
  },

  ready: function() {
    this.classList.add('peck-tooltip');
    this.classList.add(this.animation);
		if(this.arrow) {
			this.classList.add('peck-tooltip--has-arrow');
			this.classList.add(this.position);
    }
  },

  attached: function() {
    this.getTarget();
    this.attachEvenListenerToElement();
  },

  detached: function() {
    this.detachEvenListenerToElement();
  },

  /**
   *
   * Method to link the tooltip to it's target element.
   *
   * @method getTarget
   */
  getTarget: function() {
    this._target = Polymer.dom(Polymer.dom(this).getOwnerRoot()).querySelector('#' + this.for);
  },

  /**
   *
   * Method to bind the event on depends of listener variable.
   *
   * @method attachEvenListenerToElement
   */
  attachEvenListenerToElement: function() {
    if(this.action == 'hover') {
      this.listen(this._target, 'mouseenter', 'toggleTooltip');
      this.listen(this._target, 'mouseleave', 'toggleTooltip');
    }
    else if(this.action == 'click') {
      this.listen(this._target, 'click', 'toggleTooltip');
    }
  },

  /**
   *
   * Method to unbind the event on depends of listener variable.
   *
   * @method detachEvenListenerToElement
   */
  detachEvenListenerToElement: function() {
    if(this.action == 'hover') {
      this.unlisten(this._target,'mouseenter', 'toggleTooltip');
      this.unlisten(this._target,'mouseleave', 'toggleTooltip');
    }
    else if(this.action == 'click') {
      this.unlisten(this._target, 'toggleTooltip');
    }
  },

  /**
   *
   * Method to show or hide the tooltip depends on the triggered event.
   *
   * @method toggleTooltip
   */
  toggleTooltip: function() {
    this.toggleClass('visible');
    this.updatePosition();
  },

  /**
   *
   * Method to define the position of the tooltip.
   *
   * @method updatePosition
   */
  updatePosition: function() {
    var parentRect = this.offsetParent.getBoundingClientRect();
    var targetRect =  this._target.getBoundingClientRect();

    var targetWidth = this._target.clientWidth;
    var targetHeight = this._target.clientHeight;

    var posTargetLeft = targetRect.left - parentRect.left;
    var posTargetTop = targetRect.top - parentRect.top;

    var toolTipWidth = this.clientWidth;
    var toolTipHeight = this.clientHeight;

    switch(this.position) {
      case 'top':
        this.style.top = posTargetTop - toolTipHeight - parseInt(this.distanceToElement) + 'px';
        this.style.left = posTargetLeft + ((targetWidth - toolTipWidth) / 2) + 'px';
        break;
      case 'bottom':
        this.style.top = posTargetTop + targetHeight  + parseInt(this.distanceToElement) + 'px';
        this.style.left = posTargetLeft + ((targetWidth - toolTipWidth) / 2) + 'px';
        break;
      case 'left':
        this.style.top = posTargetTop + ((targetHeight - toolTipHeight) / 2) + 'px';
        this.style.left = posTargetLeft - toolTipWidth - parseInt(this.distanceToElement) + 'px';
        break;
      case 'right':
        this.style.top = posTargetTop + ((targetHeight - toolTipHeight) / 2) + 'px';
        this.style.left = posTargetLeft + targetWidth + parseInt(this.distanceToElement) + 'px';
        break;
    }
  }

});