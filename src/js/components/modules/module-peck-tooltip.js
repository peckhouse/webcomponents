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
     * Listener to trigger the tooltip (hover or click)
     *
     * @attribute listener
     * @type string
     * @default 'hover'
     */
    listener: {
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

    // #TODO: find a way to load dynamically Theme from a tag <link rel='css'/>
    /**
     * theme styles for the tooltip
     *
     * @attribute themeName
     * @type String
     * @default 'default'
     */
    // themeName: {
    //   value: 'default', 
    //   reflectToAttribute: true
    // }
    
  },

  ready: function() {
    this.classList.add('peck-tooltip');
  },

  attached: function() {
    this.getTarget();
    this.attachEvenListenerToElement();
    this.updatePosition();
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
    if(this.listener == 'hover') {
      this.listen(this._target, 'mouseenter', 'toggleTooltip');
      this.listen(this._target, 'mouseleave', 'toggleTooltip');
    }
    else if(this.listener == 'click') {
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
    if(this.listener == 'hover') {
      this.unlisten(this._target,'mouseenter', 'toggleTooltip');
      this.unlisten(this._target,'mouseleave', 'toggleTooltip');
    }
    else if(this.listener == 'click') {
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
  },
  
  /**
   * 
   * Method to define the position of the tooltip.
   *
   * @method updatePosition
   */
  updatePosition: function() {
    domElementWidth = parseInt(this._target.clientWidth);
    domElementHeight = parseInt(this._target.clientHeight);

    posDomElementTop = parseInt(this._target.offsetTop);
    posDomElementLeft = parseInt(this._target.offsetLeft);
    
    toolTipWidth = parseInt(this.clientWidth);
    toolTipHeight = parseInt(this.clientHeight);

    switch(this.position) {
      case 'top':
        this.style.top = posDomElementTop - toolTipHeight - parseInt(this.distanceToElement) + 'px';
        this.style.left = posDomElementLeft + ((domElementWidth - toolTipWidth) / 2) + 'px';
        break;
      case 'bottom':
        this.style.top = posDomElementTop + domElementHeight  + parseInt(this.distanceToElement) + 'px';
        this.style.left = posDomElementLeft + ((domElementWidth - toolTipWidth) / 2) + 'px';
        break;
      case 'left':
        this.style.top = posDomElementTop + ((domElementHeight - toolTipHeight) / 2) + 'px';
        this.style.left = posDomElementLeft - toolTipWidth - parseInt(this.distanceToElement) + 'px';
        break;
      case 'right':
        this.style.top = posDomElementTop + ((domElementHeight - toolTipHeight) / 2) + 'px';
        this.style.left = posDomElementLeft + domElementWidth + parseInt(this.distanceToElement) + 'px';
        break;
    }  
  }

});