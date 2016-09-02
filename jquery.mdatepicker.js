(function($) {
	$.fn.mdaterangepicker = function(opt) {
		if (!opt)
			opt = {};
		return this.each(function() {
			new mdaterangepicker($(this), opt);
		});
	};

	var toDate = function(Y, M, D, h, m, s, ms) {
		D = D ? D : 0;
		h = h ? h : 0;
		m = m ? m : 0;
		s = s ? s : 0;
		ms = ms ? ms : 0;
		var ts = Date.UTC(Y, M, D, h, m, s, ms);
		return new Date(ts);
	};

	var parseDate = function(dt) {
		if (dt)
			try {
				var parts = dt.split('-');
				if (parts.length === 2)
					return toDate(parts[0], parts[1] - 1, 1);
				else if (parts.length === 3)
					return toDate(parts[0], parts[1] - 1, parts[2]);
			} catch (E) {
			}
	};

	var diffMonth = function(d1, d2) {
		return d2.getUTCMonth() - d1.getUTCMonth() + (12 * (d2.getUTCFullYear() - d1.getUTCFullYear()));
	};

	var diffDays = function(d1, d2) {
		var timeDiff = Math.abs(d2.getTime() - d1.getTime());
		var diff = Math.ceil(timeDiff / (1000 * 3600 * 24));
		return diff;
	};

	var addMonth = function(d, m) {
		var dt = new Date(d.getTime());
		dt.setUTCMonth(dt.getUTCMonth() + m);
		return dt;
	};

	var addDays = function(d, days) {
		var dt = new Date(d.getTime());
		dt.setUTCDate(dt.getUTCDate() + days);
		return dt;
	};

	var isEqualsDate = function(d1, d2) {
		return d1.getUTCFullYear() === d2.getUTCFullYear() //
				&& d1.getUTCMonth() === d2.getUTCMonth() //
				&& d1.getUTCDate() === d2.getUTCDate();
	};

	var toLocaleShortDateString = function(d) {
		var f = {
			"ar-SA" : "dd/MM/yy",
			"bg-BG" : "dd.M.yyyy",
			"ca-ES" : "dd/MM/yyyy",
			"zh-TW" : "yyyy/M/d",
			"cs-CZ" : "d.M.yyyy",
			"da-DK" : "dd-MM-yyyy",
			"de-DE" : "dd.MM.yyyy",
			"el-GR" : "d/M/yyyy",
			"en-US" : "M/d/yyyy",
			"fi-FI" : "d.M.yyyy",
			"fr-FR" : "dd/MM/yyyy",
			"he-IL" : "dd/MM/yyyy",
			"hu-HU" : "yyyy. MM. dd.",
			"is-IS" : "d.M.yyyy",
			"it-IT" : "dd/MM/yyyy",
			"ja-JP" : "yyyy/MM/dd",
			"ko-KR" : "yyyy-MM-dd",
			"nl-NL" : "d-M-yyyy",
			"nb-NO" : "dd.MM.yyyy",
			"pl-PL" : "yyyy-MM-dd",
			"pt-BR" : "d/M/yyyy",
			"ro-RO" : "dd.MM.yyyy",
			"ru-RU" : "dd.MM.yyyy",
			"hr-HR" : "d.M.yyyy",
			"sk-SK" : "d. M. yyyy",
			"sq-AL" : "yyyy-MM-dd",
			"sv-SE" : "yyyy-MM-dd",
			"th-TH" : "d/M/yyyy",
			"tr-TR" : "dd.MM.yyyy",
			"ur-PK" : "dd/MM/yyyy",
			"id-ID" : "dd/MM/yyyy",
			"uk-UA" : "dd.MM.yyyy",
			"be-BY" : "dd.MM.yyyy",
			"sl-SI" : "d.M.yyyy",
			"et-EE" : "d.MM.yyyy",
			"lv-LV" : "yyyy.MM.dd.",
			"lt-LT" : "yyyy.MM.dd",
			"fa-IR" : "MM/dd/yyyy",
			"vi-VN" : "dd/MM/yyyy",
			"hy-AM" : "dd.MM.yyyy",
			"az-Latn-AZ" : "dd.MM.yyyy",
			"eu-ES" : "yyyy/MM/dd",
			"mk-MK" : "dd.MM.yyyy",
			"af-ZA" : "yyyy/MM/dd",
			"ka-GE" : "dd.MM.yyyy",
			"fo-FO" : "dd-MM-yyyy",
			"hi-IN" : "dd-MM-yyyy",
			"ms-MY" : "dd/MM/yyyy",
			"kk-KZ" : "dd.MM.yyyy",
			"ky-KG" : "dd.MM.yy",
			"sw-KE" : "M/d/yyyy",
			"uz-Latn-UZ" : "dd/MM yyyy",
			"tt-RU" : "dd.MM.yyyy",
			"pa-IN" : "dd-MM-yy",
			"gu-IN" : "dd-MM-yy",
			"ta-IN" : "dd-MM-yyyy",
			"te-IN" : "dd-MM-yy",
			"kn-IN" : "dd-MM-yy",
			"mr-IN" : "dd-MM-yyyy",
			"sa-IN" : "dd-MM-yyyy",
			"mn-MN" : "yy.MM.dd",
			"gl-ES" : "dd/MM/yy",
			"kok-IN" : "dd-MM-yyyy",
			"syr-SY" : "dd/MM/yyyy",
			"dv-MV" : "dd/MM/yy",
			"ar-IQ" : "dd/MM/yyyy",
			"zh-CN" : "yyyy/M/d",
			"de-CH" : "dd.MM.yyyy",
			"en-GB" : "dd/MM/yyyy",
			"es-MX" : "dd/MM/yyyy",
			"fr-BE" : "d/MM/yyyy",
			"it-CH" : "dd.MM.yyyy",
			"nl-BE" : "d/MM/yyyy",
			"nn-NO" : "dd.MM.yyyy",
			"pt-PT" : "dd-MM-yyyy",
			"sr-Latn-CS" : "d.M.yyyy",
			"sv-FI" : "d.M.yyyy",
			"az-Cyrl-AZ" : "dd.MM.yyyy",
			"ms-BN" : "dd/MM/yyyy",
			"uz-Cyrl-UZ" : "dd.MM.yyyy",
			"ar-EG" : "dd/MM/yyyy",
			"zh-HK" : "d/M/yyyy",
			"de-AT" : "dd.MM.yyyy",
			"en-AU" : "d/MM/yyyy",
			"es-ES" : "dd/MM/yyyy",
			"fr-CA" : "yyyy-MM-dd",
			"sr-Cyrl-CS" : "d.M.yyyy",
			"ar-LY" : "dd/MM/yyyy",
			"zh-SG" : "d/M/yyyy",
			"de-LU" : "dd.MM.yyyy",
			"en-CA" : "dd/MM/yyyy",
			"es-GT" : "dd/MM/yyyy",
			"fr-CH" : "dd.MM.yyyy",
			"ar-DZ" : "dd-MM-yyyy",
			"zh-MO" : "d/M/yyyy",
			"de-LI" : "dd.MM.yyyy",
			"en-NZ" : "d/MM/yyyy",
			"es-CR" : "dd/MM/yyyy",
			"fr-LU" : "dd/MM/yyyy",
			"ar-MA" : "dd-MM-yyyy",
			"en-IE" : "dd/MM/yyyy",
			"es-PA" : "MM/dd/yyyy",
			"fr-MC" : "dd/MM/yyyy",
			"ar-TN" : "dd-MM-yyyy",
			"en-ZA" : "yyyy/MM/dd",
			"es-DO" : "dd/MM/yyyy",
			"ar-OM" : "dd/MM/yyyy",
			"en-JM" : "dd/MM/yyyy",
			"es-VE" : "dd/MM/yyyy",
			"ar-YE" : "dd/MM/yyyy",
			"en-029" : "MM/dd/yyyy",
			"es-CO" : "dd/MM/yyyy",
			"ar-SY" : "dd/MM/yyyy",
			"en-BZ" : "dd/MM/yyyy",
			"es-PE" : "dd/MM/yyyy",
			"ar-JO" : "dd/MM/yyyy",
			"en-TT" : "dd/MM/yyyy",
			"es-AR" : "dd/MM/yyyy",
			"ar-LB" : "dd/MM/yyyy",
			"en-ZW" : "M/d/yyyy",
			"es-EC" : "dd/MM/yyyy",
			"ar-KW" : "dd/MM/yyyy",
			"en-PH" : "M/d/yyyy",
			"es-CL" : "dd-MM-yyyy",
			"ar-AE" : "dd/MM/yyyy",
			"es-UY" : "dd/MM/yyyy",
			"ar-BH" : "dd/MM/yyyy",
			"es-PY" : "dd/MM/yyyy",
			"ar-QA" : "dd/MM/yyyy",
			"es-BO" : "dd/MM/yyyy",
			"es-SV" : "dd/MM/yyyy",
			"es-HN" : "dd/MM/yyyy",
			"es-NI" : "dd/MM/yyyy",
			"es-PR" : "dd/MM/yyyy",
			"am-ET" : "d/M/yyyy",
			"tzm-Latn-DZ" : "dd-MM-yyyy",
			"iu-Latn-CA" : "d/MM/yyyy",
			"sma-NO" : "dd.MM.yyyy",
			"mn-Mong-CN" : "yyyy/M/d",
			"gd-GB" : "dd/MM/yyyy",
			"en-MY" : "d/M/yyyy",
			"prs-AF" : "dd/MM/yy",
			"bn-BD" : "dd-MM-yy",
			"wo-SN" : "dd/MM/yyyy",
			"rw-RW" : "M/d/yyyy",
			"qut-GT" : "dd/MM/yyyy",
			"sah-RU" : "MM.dd.yyyy",
			"gsw-FR" : "dd/MM/yyyy",
			"co-FR" : "dd/MM/yyyy",
			"oc-FR" : "dd/MM/yyyy",
			"mi-NZ" : "dd/MM/yyyy",
			"ga-IE" : "dd/MM/yyyy",
			"se-SE" : "yyyy-MM-dd",
			"br-FR" : "dd/MM/yyyy",
			"smn-FI" : "d.M.yyyy",
			"moh-CA" : "M/d/yyyy",
			"arn-CL" : "dd-MM-yyyy",
			"ii-CN" : "yyyy/M/d",
			"dsb-DE" : "d. M. yyyy",
			"ig-NG" : "d/M/yyyy",
			"kl-GL" : "dd-MM-yyyy",
			"lb-LU" : "dd/MM/yyyy",
			"ba-RU" : "dd.MM.yy",
			"nso-ZA" : "yyyy/MM/dd",
			"quz-BO" : "dd/MM/yyyy",
			"yo-NG" : "d/M/yyyy",
			"ha-Latn-NG" : "d/M/yyyy",
			"fil-PH" : "M/d/yyyy",
			"ps-AF" : "dd/MM/yy",
			"fy-NL" : "d-M-yyyy",
			"ne-NP" : "M/d/yyyy",
			"se-NO" : "dd.MM.yyyy",
			"iu-Cans-CA" : "d/M/yyyy",
			"sr-Latn-RS" : "d.M.yyyy",
			"si-LK" : "yyyy-MM-dd",
			"sr-Cyrl-RS" : "d.M.yyyy",
			"lo-LA" : "dd/MM/yyyy",
			"km-KH" : "yyyy-MM-dd",
			"cy-GB" : "dd/MM/yyyy",
			"bo-CN" : "yyyy/M/d",
			"sms-FI" : "d.M.yyyy",
			"as-IN" : "dd-MM-yyyy",
			"ml-IN" : "dd-MM-yy",
			"en-IN" : "dd-MM-yyyy",
			"or-IN" : "dd-MM-yy",
			"bn-IN" : "dd-MM-yy",
			"tk-TM" : "dd.MM.yy",
			"bs-Latn-BA" : "d.M.yyyy",
			"mt-MT" : "dd/MM/yyyy",
			"sr-Cyrl-ME" : "d.M.yyyy",
			"se-FI" : "d.M.yyyy",
			"zu-ZA" : "yyyy/MM/dd",
			"xh-ZA" : "yyyy/MM/dd",
			"tn-ZA" : "yyyy/MM/dd",
			"hsb-DE" : "d. M. yyyy",
			"bs-Cyrl-BA" : "d.M.yyyy",
			"tg-Cyrl-TJ" : "dd.MM.yy",
			"sr-Latn-BA" : "d.M.yyyy",
			"smj-NO" : "dd.MM.yyyy",
			"rm-CH" : "dd/MM/yyyy",
			"smj-SE" : "yyyy-MM-dd",
			"quz-EC" : "dd/MM/yyyy",
			"quz-PE" : "dd/MM/yyyy",
			"hr-BA" : "d.M.yyyy.",
			"sr-Latn-ME" : "d.M.yyyy",
			"sma-SE" : "yyyy-MM-dd",
			"en-SG" : "d/M/yyyy",
			"ug-CN" : "yyyy-M-d",
			"sr-Cyrl-BA" : "d.M.yyyy",
			"es-US" : "M/d/yyyy"
		};

		var l = navigator.language ? navigator.language : navigator['userLanguage'], y = d.getFullYear(), m = d.getMonth() + 1, d = d.getDate();
		f = (l in f) ? f[l] : "MM/dd/yyyy";
		function z(s) {
			s = '' + s;
			return s.length > 1 ? s : '0' + s;
		}
		f = f.replace(/yyyy/, y);
		f = f.replace(/yy/, String(y).substr(2));
		f = f.replace(/MM/, z(m));
		f = f.replace(/M/, m);
		f = f.replace(/dd/, z(d));
		f = f.replace(/d/, d);
		return f;
	};

	var mdaterangepicker = function(selector, opt) {
		this.$object = $(selector);
		var now = new Date();
		var end = new Date(now.getUTCFullYear() + 2, now.getUTCMonth(), now.getUTCDate());

		this.opt = $.extend({}, {
			from : now.toISOString().substring(0, 10),
			to : end.toISOString().substring(0, 10),
			monthFullLabels : [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
			fullSelection : true,
			dragEnabled : true,
			change : function() {
			},
		}, opt);

		this.today = now;
		// console.log(this.opt);

		var me = this;
		this.$object.click(function() {
			me.__popup();
		});
		this.$object.focus(function() {
			me.__popup();
		});

		if (me.opt.selectionFrom && me.opt.selectionTo) {
			me.selectionFrom = parseDate(me.opt.selectionFrom);
			me.selectionTo = parseDate(me.opt.selectionTo);
			console.log(me.opt.selectionFrom);
		}

		return this;
	};

	mdaterangepicker.prototype.getDateRangeString = function() {
		var d1 = this.selectionFrom;
		var d2 = this.selectionTo;
		var s = "";
		if (d1) {
			var d = d1;
			var lcDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0);
			s += lcDate.toISOString().substring(0, 10);
		}

		if (d2) {
			var d = d2;
			var lcDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0);
			if (d1)
				s += " ~ ";
			s += lcDate.toISOString().substring(0, 10);
		}
		return s;
	};

	mdaterangepicker.prototype.__popup = function() {
		var $frame = $("body>.mdatepicker");
		if ($frame.length > 0) {
			var mdatepickerID = $frame.attr("data-mdatepicker");
			if (this.mdatepickerID != mdatepickerID) {
				// console.log("mdatepickerID : " + mdatepickerID);
				$frame.remove();
				$frame = $("body>.mdatepicker");
			}
		}

		if ($frame.length === 0) {
			try {
				var v = this.$object.val().trim(); // 2016-10-05 ~ 2016-10-13
				if (v !== "") {
					var pos = v.indexOf("~");
					var tk = v.split(/[~]/);
					if (tk.length === 2) {
						this.opt.selectionFrom = parseDate(tk[0]);
						this.opt.selectionTo = parseDate(tk[1]);
						this.selectionFrom = parseDate(tk[0]);
						this.selectionTo = parseDate(tk[1]);
					} else if (tk.length === 1) {
						this.opt.selectionFrom = parseDate(tk[0]);
						this.selectionFrom = parseDate(tk[0]);
					}
				}
			} catch (E) {
				console.log(E);
			}

			// --
			$frame = this.__init();
		}
	};

	mdaterangepicker.prototype.__init = function() {
		var me = this;

		var $frame = $("<div></div>");
		$frame.addClass("mdatepicker");
		$("body").append($frame);
		me.mdatepickerID = new Date().getTime();
		$frame.attr("data-mdatepicker", me.mdatepickerID);

		var $container = $("<div></div>");
		$frame.append($container);

		var $hdr = $("<div></div>");
		$hdr.addClass("hdr");
		$container.append($hdr);

		var $area = $("<div></div>");
		$area.addClass("area");
		$container.append($area);

		var $ok = $("<button></button>");
		$ok.addClass("submit");
		$ok.text("Save >");
		$frame.append($ok);

		// $hdr
		var $hdr1 = $("<div></div>");
		$hdr1.addClass("hdr1");
		$hdr.append($hdr1);

		var $hdr3 = $("<div></div>");
		$hdr3.addClass("hdr3");
		$hdr.append($hdr3);

		var $close = $("<button></button>");
		$close.addClass("close");
		$hdr1.append($close);

		var $div1 = $("<div></div>");
		$hdr1.append($div1);
		var $label1 = $("<span></span>");
		$div1.append($label1);
		var $label2 = $("<span></span>");
		$div1.append($label2);

		var $reset = $("<button>reset</button>");
		$reset.addClass("reset");
		$hdr1.append($reset);
		// --

		var wd = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
		var d1970 = new Date(1970, 1, 1, 0, 0, 0, 0);
		var l = navigator.language ? navigator.language : navigator['userLanguage'];
		for (var i = 0; i < 7; i++) {
			(function() {
				var d = addDays(d1970, i);
				var n = wd[i];
				if (d.toLocaleString) {
					var s = d.toLocaleString(l, {
						weekday : 'short'
					});
					if (s.length < 3)
						n = s;
				}
				var $wd = $("<div></div>");
				$wd.addClass("weekday day");
				$wd.html("<span>" + n + "</span>");
				$hdr3.append($wd);
			})();
		}

		// --

		var updateDateLabel = function() {
			var d1 = me.selectionFrom;
			var d2 = me.selectionTo;
			// console.log("---> " + d1);
			// console.log("---> " + d2);

			if (d1) {
				var d = d1;
				var lcDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0);
				$label1.text(toLocaleShortDateString(lcDate));
			} else {
				$label1.text("");
			}
			if (d2) {
				var d = d2;
				var lcDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0);
				$label2.text(toLocaleShortDateString(lcDate));
			} else {
				$label2.text("");
			}
		};

		var clearSelectionRange = function() {
			$area.find(".selected").removeClass("selected");
			$area.find(".start").removeClass("start");
			$area.find(".end").removeClass("end");
		};

		var setSelectionRange = function(d1, d2) {
			// console.log("---> " + d1);
			// console.log("---> " + d2);
			clearSelectionRange();

			if (d1 && d2) {
				if (d1 > d2) {
					var t = d1;
					d1 = d2;
					d2 = t;
				}
				me.selectionFrom = d1;
				me.selectionTo = d2;

				var diff = diffDays(d2, d1);
				// console.log("date diff : " + diff);
				if (diff === 0) {
					var d = d1;
					var lcDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0);
					var expr = lcDate.toISOString().substring(0, 10);
					var $cell = $area.find("[data-date='" + expr + "']");
					$cell.addClass("selected start end");
				} else {
					if (me.opt.fullSelection) {
						for (var i = 0; i <= diff; i++) {
							var d = addDays(d1, i);
							var lcDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0);
							var expr = lcDate.toISOString().substring(0, 10);
							var $cell = $area.find("[data-date='" + expr + "']");
							$cell.addClass("selected");

							if (i === 0) {
								$cell.addClass("start");
							} else if (i === (diff)) {
								$cell.addClass("end");
							}
						}
					} else {
						if (d1) {
							var d = d1;
							var lcDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0);
							var expr = lcDate.toISOString().substring(0, 10);
							var $cell = $area.find("[data-date='" + expr + "']");
							$cell.addClass("selected start end");
						}
						if (d2) {
							var d = d2;
							var lcDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0);
							var expr = lcDate.toISOString().substring(0, 10);
							var $cell = $area.find("[data-date='" + expr + "']");
							$cell.addClass("selected start end");
						}
					}
				}
			} else {
				if (d1) {
					var lcDate = new Date(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), 0, 0, 0, 0);
					var expr = lcDate.toISOString().substring(0, 10);
					$area.find("[data-date='" + expr + "']").addClass("selected");
				}
				if (d2) {
					var lcDate = new Date(d2.getUTCFullYear(), d2.getUTCMonth(), d2.getUTCDate(), 0, 0, 0, 0);
					var expr = lcDate.toISOString().substring(0, 10);
					$area.find("[data-date='" + expr + "']").addClass("selected");
				}
			}

			updateDateLabel();
		};

		// $area
		var from = parseDate(this.opt.from);
		from.setUTCDate(1);
		var now = new Date();
		var today = toDate(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
		var to = parseDate(this.opt.to);
		var dateL = me.opt.allowPast ? from : today;
		var dateU = addDays(to, 1);
		var diffm = diffMonth(from, to);
		var touchEnabled = (function() {
			try {
				document.createEvent("TouchEvent");
				return true;
			} catch (e) {
				return false;
			}
		})();

		// console.log(this.opt.from);
		// console.log(from);
		// console.log(diffm);
		for (var i = 0; i <= diffm; i++) {
			var YM = addMonth(from, i);
			// console.log(YM.toISOString());

			var M = YM.getUTCMonth();
			var weekday = YM.getUTCDay();
			var lastday = toDate(YM.getUTCFullYear(), YM.getUTCMonth() + 1, 0).getUTCDate();

			var $cal = $("<div></div>");
			$cal.addClass("calender");
			$area.append($cal);

			var $mlabel = $("<div></div>");
			$mlabel.addClass("month");
			$mlabel.text(me.opt.monthFullLabels[YM.getUTCMonth()] + " " + YM.getUTCFullYear())
			$cal.append($mlabel);

			var $grid = $("<div></div>");
			$grid.addClass("grid");
			$cal.append($grid);

			var $down = undefined;
			var $move = undefined;

			for (var day = 0; day < weekday; day++) {
				var $wd = $("<div></div>");
				$wd.addClass("day blank");
				$wd.html("<span></span>");
				$grid.append($wd);
			}
			for (var day = 1, date = YM; day <= lastday; date = addDays(YM, day), day++) {
				// console.log(date);
				(function() {
					var lcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0);
					var $wd = $("<div></div>");
					$wd.addClass("day");
					$wd.attr("title", lcDate.toLocaleDateString());
					$wd.html("<span>" + day + "</span>");
					$grid.append($wd);

					if (isEqualsDate(today, date)) {
						$wd.addClass("today");
					}

					if (dateL.getTime() > date.getTime()) {
						$wd.addClass("disabled");
					} else if (dateU.getTime() <= date.getTime()) {
						$wd.addClass("disabled");
					} else {
						$wd.attr("data-date", lcDate.toISOString().substring(0, 10));

						if (me.opt.dragEnabled) {
							$wd.on("mousedown", function(ev) {
								if (!$down) {
									$down = $(this);
									$down.addClass("selected");
								}
							});
							$wd.on("mousemove", function(ev) {
								if ($down) {
									$move = $(this);
									var d1 = parseDate($down.attr("data-date"));
									var d2 = parseDate($move.attr("data-date"));
									if (d1 !== d2) {
										setSelectionRange(d1, d2);
										var f = me.opt.change;
										f.call(me, me.selectionFrom, me.selectionTo);
									}
								}
							});
							$wd.on("mouseup", function(ev) {
								if ($move) {
									var $up = $(this);
									var d1 = parseDate($down.attr("data-date"));
									var d2 = parseDate($up.attr("data-date"));
									if (d1 !== d2) {
										setSelectionRange(d1, d2);
										var f = me.opt.change;
										f.call(me, me.selectionFrom, me.selectionTo);
									}
									$down = undefined;
									$move = undefined;
								}
							});
						}
						$wd.click(function() {
							$down = undefined;
							$move = undefined;
							if (!me.selectionFrom) {
								me.selectionFrom = lcDate;
							} else if (!me.selectionTo) {
								me.selectionTo = lcDate;
							} else if (me.selectionTo <= lcDate) {
								me.selectionTo = lcDate;
							} else if (me.selectionFrom >= lcDate) {
								me.selectionFrom = lcDate;
							} else {
								var diff = diffDays(me.selectionFrom, me.selectionTo);
								var center = Math.ceil(diff / 2);
								var cDate = addDays(me.selectionFrom, center);
								if (cDate > lcDate) {
									me.selectionFrom = lcDate;
								} else {
									me.selectionTo = lcDate;
								}
							}

							setSelectionRange(me.selectionFrom, me.selectionTo);

							var f = me.opt.change;
							f.call(me, me.selectionFrom, me.selectionTo);
						});

					}
				})();
			}
			if (me.opt.dragEnabled) {
				$grid.on("touchstart", function(ev) {
					var $target = $(ev.target || ev.srcElement);
					if ($target.prop("tagName") === "SPAN")
						$target = $target.parent();
					if ($target.hasClass("disabled"))
						return;

					$down = $target;
					$down.addClass("selected");
				});
				$grid.on("touchmove", function(ev) {
					if ($down) {
						var te = ev.originalEvent.changedTouches[0];
						var $target = $(document.elementFromPoint(te.clientX, te.clientY));
						if ($target.prop("tagName") === "SPAN")
							$target = $target.parent();
						if ($target.hasClass("disabled")) {
							return;
						}

						$move = $target;

						var d1 = parseDate($down.attr("data-date"));
						var d2 = parseDate($move.attr("data-date"));
						if (d1 !== d2) {
							setSelectionRange(d1, d2);
							var f = me.opt.change;
							f.call(me, me.selectionFrom, me.selectionTo);
						}
					}
				});
				$grid.on("touchend", function(ev) {
					if ($move) {
						var te = ev.originalEvent.changedTouches[0];
						var $up = $(document.elementFromPoint(te.clientX, te.clientY));
						if ($up.prop("tagName") === "SPAN")
							$up = $up.parent();
						if ($up.hasClass("disabled")) {
							return;
						}

						var d1 = parseDate($down.attr("data-date"));
						var d2 = parseDate($up.attr("data-date"));
						if (d1 !== d2) {
							setSelectionRange(d1, d2);
							var f = me.opt.change;
							f.call(me, me.selectionFrom, me.selectionTo);
						}
					}
					$move = undefined;
					$down = undefined;
				});
			}
		}

		setSelectionRange(me.selectionFrom, me.selectionTo)

		// --

		$close.click(function() {
			clearSelectionRange();
			me.selectionFrom = undefined;
			me.selectionTo = undefined;
			$frame.remove();
		});

		$reset.click(function() {
			clearSelectionRange();
			me.selectionFrom = undefined;
			me.selectionTo = undefined;
			updateDateLabel();
		});

		$ok.click(function() {
			me.$object.val(me.getDateRangeString());
			$frame.remove();
		});

		return $frame;
	}

}(jQuery));
