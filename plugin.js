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
			var that = this;
			jQuery('body').append('<div id="NKA_debugger"></div>');
			GENTICS.Aloha.EventRegistry.subscribe(GENTICS.Aloha, 'selectionChanged', function(event, rangeObject) {
				jQuery('#NKA_debugger').empty().append(that.renderRangeTree(rangeObject.getRangeTree()));
			});
		},
		renderRangeTree: function(tree) {
			var that = this;
			if (tree) {
				var list = jQuery('<ul></ul>');
				jQuery.each(tree, function(index, item) {
					if (item.type == 'none') {
						return true;
					}
					var li = jQuery('<li></li>');
					list.append(li);
					if (item.domobj) {
						var text = item.domobj.nodeName + ' (' + item.type + ') ';
						li.text(text);
						if (item.domobj.nodeType == 3) {
							var i = jQuery('<i></i>');
							if (item.type == 'partial') {
								i.text(item.domobj.nodeValue.substring(item.startOffset, item.endOffset));
							} else {
								i.text(item.domobj.nodeValue);
							}
							li.append(i);
						}
						var sub = that.renderRangeTree(item.children);
						if (sub) {
							li.append(sub);
						}
					}
				});

				return list;
			}
		}
		
	
	});