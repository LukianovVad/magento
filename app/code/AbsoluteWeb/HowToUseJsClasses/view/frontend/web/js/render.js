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

define([
    'AbsoluteWeb_HowToUseJsClasses/js/instances/render-class'
], Render =>
    (config, element) =>
        new Render(config, element)
);
