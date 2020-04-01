import CMS from "netlify-cms"
import * as ColorWidget from "netlify-cms-widget-color";
import { Widget as IdWidget } from '@ncwidgets/id'
import { Widget as ReorderWidget } from '@ncwidgets/reorder'
import { Widget as FileRelationWidget } from '@ncwidgets/file-relation'

CMS.registerWidget("color", ColorWidget.Control);
CMS.registerWidget(IdWidget)
// CMS.registerWidget(ReorderWidget)
// CMS.registerWidget(FileRelationWidget)

// CMS.init()