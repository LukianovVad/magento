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
    return (originalClass) => {
        class RenderMixin extends originalClass {

            /**
             * Initialize class.
             * 
             * @return {Render} Current class instance.
             */
            init() {
                super.init()
                    .createAdditionalElement();

                return this;
            }

            /**
             * @async
             * @return {Render} Current class instance.
             */
            async createAdditionalElement() {
                const data = await this.getData();
                const target = await this.waitForElement(this.id);
                const position = 'beforeend';
                const element = `
                    <div>Height:</div>
                    <div>${super.getValue(data, 'height')}</div>
                `;

                super.renderElement(target, position, element);

                return this;
            }

            /**
             * @async
             * @param {string} id - element id.
             * @return {Promise} Promise with MutationObserver.
             */
            async waitForElement(id) {
                return new Promise(resolve => {
                    if (document.getElementById(id)) {
                        return resolve(document.getElementById(id));
                    }
            
                    const observer = new MutationObserver(() => {
                        if (document.getElementById(id)) {
                            resolve(document.getElementById(id));
                            observer.disconnect();
                        }
                    });
            
                    observer.observe(document.body, {
                        childList: true,
                        subtree: true
                    });
                });
            }
        }

        return RenderMixin;
    };
});
