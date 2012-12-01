// ==UserScript==
// @name bro3_pager_helper
// @namespace https://github.com/5zen/
// @version 2012.12.01
// @description ブラウザ三国志 ページリンク修正
// @match http://*.3gokushi.jp/union/index.php*
// @match http://*.3gokushi.jp/card/deck.php*
// @match http://*.3gokushi.jp/card/trade_card.php*
// @match http://*.3gokushi.jp/union/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @copyright gozensan
// ==/UserScript==

// 2012.11.30	リリース
// 2012.12.01	合成・トレード時の表示を変更
//              修行・LVUP・削除・ラベル選択・表示カードの種類 の 処理を追加
//		デュエルのカード選択処理部分を追加
//		生贄選択のページのみはJavascriptのため諦めました。
jQuery.noConflict();
j$ = jQuery;

HOST = location.hostname;


if (location.pathname == "/card/deck.php") {

	// 初期値
	maxPage = 33;

	// 通常のページャーを非表示
	var rank = xpath('//ul[@class="pager"]', document);
	for (var i=0; i < rank.snapshotLength; i++) {
		rank.snapshotItem(i).style.display = "none";

	}

	// 現在の表示ページの取得
	var getNowPage = xpath('//ul[@class="pager"]//b', document);
	if (getNowPage.snapshotLength) {
		nowPage = parseInt(getNowPage.snapshotItem(0).innerHTML);
	}

	// 最終ページの取得
	maxPage = nowPage;
	var lastPage = xpath('//a[@title="last page"]', document);
	if (lastPage.snapshotLength) {
		lastPage.snapshotItem(0).href.match(/p=(\d+)/);
		maxPage = parseInt(RegExp.$1);
	}

	// 表示ラベルの取得
	if (location.search.match(/l=(\d+)/) != null) {
		location.search.match(/l=(\d+)/);
		nowLabel = parseInt(RegExp.$1);
	} else {
		nowLabel = 0;
	}

	addLink = '<div align=center><ul class="pager">';
	for ( var i=1; i <= maxPage; i++){
		if (i == nowPage) {
			addLink += '&nbsp&nbsp<b>' + i + '</b>&nbsp&nbsp';
		} else {
			if ( (i < nowPage + 3) && (i > nowPage - 3) ) {
				addLink += '<li><a  href="/card/deck.php?p=' + i + '&l=' + nowLabel + '#filetop">&nbsp&nbsp' + i + '&nbsp&nbsp</a></li>';
			} else {
				addLink += '<li><a href="/card/deck.php?p=' + i + '&l=' + nowLabel + '#filetop"><span onmouseover="this.textContent =\'' + '　' + i + '　\'" onmouseout="this.textContent =\'　　\'">　　</span></a></li>';
			}

		}
	}
	addLink += '</ul></div>';

	// ページャーの追加 ================================================================================================================
	GM_addStyle("#rotate div.rotateInfo ul.pager	{ background: none repeat scroll 0 center transparent; clear: none; float: right; line-height: 2; margin: 5px 0px 3px 10px; padding: 0; text-align: right; width: 920px; }");	// 本拠地
	GM_addStyle("#rotate div.rotateInfo ul.pager li a {    padding: 3px 0px !important; }");

	// すべて
	var addHTML = xpath('//div[@class="rotateInfo clearfix label-all-color-inner"]', document);
	if (addHTML.snapshotLength) {
		addHTML.snapshotItem(0).innerHTML += addLink;
	}

	var addHTML = xpath('//div[@class="rotateInfo bottom label-all-color-bottom clearfix"]', document);
	if (addHTML.snapshotLength) {
		addHTML.snapshotItem(0).innerHTML += addLink;
	}

	// ラベル１
	var addHTML = xpath('//div[@class="rotateInfo clearfix label-blue-color-inner"]', document);
	if (addHTML.snapshotLength) {
		addHTML.snapshotItem(0).innerHTML += addLink;
	}

	var addHTML = xpath('//div[@class="rotateInfo bottom label-blue-color-bottom clearfix"]', document);
	if (addHTML.snapshotLength) {
		addHTML.snapshotItem(0).innerHTML += addLink;
	}

	// ラベル２
	var addHTML = xpath('//div[@class="rotateInfo clearfix label-green-color-inner"]', document);
	if (addHTML.snapshotLength) {
		addHTML.snapshotItem(0).innerHTML += addLink;
	}

	var addHTML = xpath('//div[@class="rotateInfo bottom label-green-color-bottom clearfix"]', document);
	if (addHTML.snapshotLength) {
		addHTML.snapshotItem(0).innerHTML += addLink;
	}

	// ラベル３
	var addHTML = xpath('//div[@class="rotateInfo clearfix label-red-color-inner"]', document);
	if (addHTML.snapshotLength) {
		addHTML.snapshotItem(0).innerHTML += addLink;
	}

	var addHTML = xpath('//div[@class="rotateInfo bottom label-red-color-bottom clearfix"]', document);
	if (addHTML.snapshotLength) {
		addHTML.snapshotItem(0).innerHTML += addLink;
	}


}


if ( (location.pathname == "/union/index.php") || (location.pathname == "/card/trade_card.php") || (location.pathname == "/union/learn.php") || (location.pathname == "/union/lvup.php") || (location.pathname == "/union/expup.php") || (location.pathname == "/union/remove.php") ) {

	addLink = '<div id="card_uraomote-omote"><ul class="pager">';
	maxPage = 33;

	// 通常のページャーを非表示
	var rank = xpath('//ul[@class="pager"]', document);
	if (rank.snapshotLength) {
		rank.snapshotItem(0).style.display = "none";
	}

	// 現在の表示ページの取得
	var nowPage = 0;
	var getNowPage = xpath('//ul[@class="pager"]//b', document);
	if (getNowPage.snapshotLength) {
		nowPage = parseInt(getNowPage.snapshotItem(0).innerHTML);
	}

	// 最終ページの取得
	var maxPage = nowPage;
	var lastPage = xpath('//a[@title="last page"]', document);
	if (lastPage.snapshotLength) {
		lastPage.snapshotItem(0).href.match(/p=(\d+)/);
		maxPage = parseInt(RegExp.$1);
	}

	// 合成カード選択
	var cardNo = 0;
	if (location.search.match(/cid=(\d+)/) != null) {
		location.search.match(/cid=(\d+)/);
		cardNo = parseInt(RegExp.$1);
	} else {
		cardNo = 0;
	}

	// ラベル設定絞込み
	var unionNo = 0;
	var labelNodc = xpath('//form[@id="union_card_label_form"]/p/select/option[@selected="selected"]', document);
	if (labelNodc.snapshotLength) {
		labelNo = parseInt(labelNodc.snapshotItem(0).value);
	}

	// 合成可能カード絞込み
	var unionNo = 0;
	var unionNodc = xpath('//form[@id="union_card_select_form"]/p/select/option[@selected="selected"]', document);
	if (unionNodc.snapshotLength) {
		unionNo = parseInt(unionNodc.snapshotItem(0).value);
	}

	for ( var i=1; i <= maxPage; i++){
		if (i == nowPage) {
			addLink += '&nbsp<li><b>' + i + '</b></li>&nbsp';
		} else {
			// 合成元カード選択
			if (location.pathname == "/union/index.php") {
				if ( (i < nowPage + 4) && (i > nowPage - 4) ) {
					addLink += '<li><a href="/union/index.php?union_card_select=' + unionNo + '&p=' + i + '&label=' + labelNo + '#filetop">&nbsp&nbsp' + i + '&nbsp&nbsp</a></li>';
				} else {
					addLink += '<li><a href="/union/index.php?union_card_select=' + unionNo + '&p=' + i + '&label=' + labelNo + '#filetop"><span onmouseover="this.textContent =\'' + ' ' + i + '&nbsp\'" onmouseout="this.textContent =\'&nbsp&nbsp\'">&nbsp&nbsp</span></a></li>';
				}
			}
			// トレード
			if (location.pathname == "/card/trade_card.php") {
				if ( (i < nowPage + 4) && (i > nowPage - 4) ) {
					addLink += '<li><a  href="/card/trade_card.php?p=' + i + '#filetop">&nbsp&nbsp' + i + '&nbsp&nbsp</a></li>';
				} else {
					addLink += '<li><a href="/card/trade_card.php?p=' + i + '#filetop"><span onmouseover="this.textContent =\'' + ' ' + i + '&nbsp\'" onmouseout="this.textContent =\'&nbsp&nbsp\'">&nbsp&nbsp</span></a></li>';
				}
			}
			// 合成・修行・LVUP・削除用カード選択

			if ( (location.pathname == "/union/learn.php") || (location.pathname == "/union/lvup.php") || (location.pathname == "/union/expup.php") || (location.pathname == "/union/remove.php") ) {
				if ( (i < nowPage + 4) && (i > nowPage - 4) ) {
					addLink += '<li><a href="' + location.pathname + '?cid=' + cardNo + '&p=' + i + '&label=' + labelNo + '#filetop">&nbsp&nbsp' + i + '&nbsp&nbsp</a></li>';
				} else {
					addLink += '<li><a href="' + location.pathname + '?cid=' + cardNo + '&p=' + i + '&label=' + labelNo + '#filetop"><span onmouseover="this.textContent =\'' + ' ' + i + '&nbsp\'" onmouseout="this.textContent =\'&nbsp&nbsp\'">&nbsp&nbsp</span></a></li>';
				}
			}
		}
	}
	addLink += '</ul></div>';

	// ページャーの追加 ================================================================================================================
	GM_addStyle("#rotate div.rotateInfo ul.pager	{ background: none repeat scroll 0 center transparent; clear: none; float: none; line-height: 2; margin: 0; padding: 0; text-align: right; width: 420px; }");	// 本拠地
	GM_addStyle("ul.pager li a			{ background: none repeat scroll 0 0 #666666;    color: #FFFFFF !important;    padding: 3px 0px;    text-decoration: none !important;}");

	j$("#card_uraomote-omote").after(addLink);
}

function xpath(query,targetDoc) {
	return document.evaluate(query, targetDoc, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

