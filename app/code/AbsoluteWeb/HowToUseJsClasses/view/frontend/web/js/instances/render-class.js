/**
 * Absolute Web Intellectual Property
 *
 * @category     {AbsoluteWeb/cookbook}
 * @copyright    Copyright (c) 1999-2022 Absolute Web, Inc. (http://www.absoluteweb.com)
 * @author       Absolute Web
 * @license      http://www.absoluteweb.com/license-agreement/  Single domain license
 * @terms of use http://www.absoluteweb.com/terms-of-use/
 */

'use strict';

define([], () => {
    class Render {

        data = null;

        /**
         * Create a point.
         * 
         * @param {Object.<string, string>} config - module config.
         * @param {number|boolean} element - element.
         */
        constructor(
            config = {},
            element = false
        ) {
            this.config = config;
            this.element = element;
            this.data = this.data;

            this.init();
        }

        /**
         * Initialize class.
         * Reveal config to class instance.
         * 
         * @return {Render} Current class instance.
         */
        init() {
            Object.assign(this, this.config);

            this.observe();

            return this;
        }

        /**
         * Observe changes in the intersection of a target element.
         * @return {Render} Current class instance.
         */
        observe() {
            const gap = '100px';
            const footerElement = document.querySelector(this.footerSelector);

            new IntersectionObserver(
                this.handleIntersect.bind(this),
                { rootMargin: gap }
            ).observe(footerElement);

            return this;
        }

        /**
         * @param {IntersectionObserverEntry[]} entries - entries for each target.
         * @param {IntersectionObserver} observer - observer instance.
         * @return {Render} Current class instance.
         */
        handleIntersect(entries, observer) {
            entries.forEach(({ isIntersecting, target }) => {
                if (!isIntersecting) return;

                this.createElement();

                observer.unobserve(target);
            });

            return this;
        }

        /**
         * @async
         * @return {Promise<string>|object} The data from the URL.
         */
        async getData() {
            return !this.data
                ? await this.#loadData()
                : this.data;
        }

        /**
         * Request data from the URL.
         *
         * @async
         * @private
         * @return {Promise<string>|object} The data from the URL.
         */
        async #loadData() {
            const response = await fetch(this.url);
    
            return response.json();
        }

        /**
         * @async
         * @return {Render} Current class instance.
         */
        async createElement() {
            const data = await this.getData();
            const position = 'afterend';
            const element = `
                <div id="${this.id}">
                    <div>Name:</div>
                    <div>${this.getValue(data, 'name')}</div>
                    <div>Gender:</div>
                    <div>${this.getValue(data, 'gender')}</div>
                </div>
            `;

            this.renderElement(this.element, position, element);

            return this;
        }

        /**
         * @param {HTMLElement} target - element to insert.
         * @param {string} position - render position.
         * @param {string} element - element to render.
         * @return {Render} Current class instance.
         */
        renderElement(target, position, element) {
            target.insertAdjacentHTML(
                position,
                element
            );

            return this;
        }

        /**
         * @param {object} data - request data.
         * @param {string} key - request data key.
         * @return {*} Requested value. 
         */
        getValue(data, key) {
            return Reflect.has(data, key)
                ? Reflect.get(data, key)
                : 'Unknown';
        }
    }

    return Render;
});
