/**
 * Nka debugger plugin, from Norbert Pomaroli showcase at #aedc 201102
 * 
 */

DebuggerPlugin = new GENTICS.Aloha.Plugin('me.nka.aloha.Debugger');
jQuery.extend(true,DebuggerPlugin,{
		/**
		 * Initialize plugin
		 */
		init: function() {
			jQuery('head').append('<link rel="stylesheet" href="' 
					+ GENTICS.Aloha.settings.base 
					+ 'plugins/me.nka.aloha.Debugger/css/jquery.treeview.css" />');
			jQuery('head').append('<script type="text/javascript" src="' 
					+ GENTICS.Aloha.settings.base 
					+ 'plugins/me.nka.aloha.Debugger/lib/treeview/jquery.treeview.js"></script>');
			var that = this;
			jQuery('body').append('<div id="NKA_debugger"><div id="NKA_debug_editable"></div><div id="NKA_debug_tabs"></div><div id="NKA_debug_console"></div></div>');
			jQuery('#NKA_debug_tabs').append('<ul><li><a href="#NKA_range_tree_console">SelectionRange</a></li><li><a href="#NKA_debug_console">Log Console</a></li></ul>');
			jQuery('#NKA_debug_tabs').append('<div id="NKA_range_tree_console">No SelectionRange</div><div id="NKA_debug_console"></div>');
			jQuery('#NKA_debug_console').prepend('<div id="NKA_info_checkbox"><input type="checkbox" value="debug" />DEBUG<input type="checkbox" value="info" />INFO<input type="checkbox" value="warn" />WARN<input type="checkbox" value="error" />ERROR</div>');
			jQuery('#NKA_info_checkbox :checkbox').change(function(event) {
					var el = jQuery(this);
					GENTICS.Aloha.settings.logLevels[el.attr("value")] = el.attr("checked");
					}
				);
			jQuery('#NKA_debugger').dialog({'title': 'Aloha debugger window'});
			jQuery('#NKA_debug_tabs').tabs();
			GENTICS.Aloha.EventRegistry.subscribe(GENTICS.Aloha, 'selectionChanged', function(event, rangeObject) {
				jQuery('#NKA_range_tree_console').empty().append(that.renderRangeTree(rangeObject.getRangeTree()).treeview({collapsed: true}));
				jQuery('#NKA_debug_editable').empty().append('<nav/>').append(GENTICS.Aloha.activeEditable.getId());
//				var logHistory = GENTICS.Aloha.Log.getLogHistory();
//				var len = logHistory.length;
//				jQuery('#NKA_debug_items').empty();
//				while(--len >= 0) {
//					jQuery('#NKA_debug_items').prepend('<li>'+logHistory[len].level + ":" + logHistory[len].message+'</li>');					
//				}
//				logHistory.flush();
			});
		},
		renderRangeTree: function(tree) {
			var that = this;
			if (tree && tree.length != 0) {
				var list = jQuery('<ul/>');
				jQuery.each(tree, function(index, item) {
					if (item.type == 'none') {
						return true;
					}
					if (item.domobj) {
						var li = jQuery('<li/>');
						list.append(li);
						var text = item.domobj.nodeName + ' (' + item.type + ') ';
						li.append(jQuery('<span/>').text(text));
						if (item.domobj.nodeType == 3) {
							var i = jQuery('<li/>');
							if (item.type == 'partial') {
								i.text(item.domobj.nodeValue.substring(item.startOffset, item.endOffset));
							} else {
								i.text(item.domobj.nodeValue);
							}
							li.append(jQuery('<ul/>').append(i));
						}
						var sub = that.renderRangeTree(item.children);
						if (sub) {
							li.append(sub);
						}
					} else {
						return true;
					}
					});
				return list; //.accordion({ collapsible: true, autoHeight: false });
			}
		}
		
	
	});