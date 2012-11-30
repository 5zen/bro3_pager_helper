// ==UserScript==
// @name bro3_pager_helper
// @namespace https://github.com/5zen/
// @version 0.1
// @description ブラウザ三国志 ページリンク修正
// @match http://*.3gokushi.jp/union/index.php*
// @match http://*.3gokushi.jp/card/deck.php*
// @match http://*.3gokushi.jp/card/trade_card.php*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @copyright gozensan
// ==/UserScript==

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

	addLink = '<ul class="pager">';
	for ( var i=1; i <= maxPage; i++){
		if (i == nowPage) {
			addLink += '&nbsp&nbsp<b>' + i + '</b>&nbsp&nbsp';
		} else {
			addLink += '<li><a title=" ' + i + '" href="/card/deck.php?p=' + i + '&l=' + nowLabel + '#file-1">&nbsp' + i + '&nbsp</a></li>';
		}

		if (i == 12 || i== 24) {
			addLink += '<br>';
		}
	}
	addLink += '</ul>';

	// ページャーの追加 ================================================================================================================
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

if ( (location.pathname == "/union/index.php") || (location.pathname == "/card/trade_card.php") ) {

	addLink = '<div id="card_uraomote-omote"><ul class="pager">';
	maxPage = 33;

	// 通常のページャーを非表示
	var rank = xpath('//ul[@class="pager"]', document);
	if (rank.snapshotLength) {
		rank.snapshotItem(0).style.display = "none";
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

	for ( var i=1; i <= maxPage; i++){
		if (i == nowPage) {
			addLink += '&nbsp&nbsp<li><b>' + i + '</b></li>&nbsp&nbsp';
		} else {
			if (location.pathname == "/union/index.php") {
				addLink += '<li><a title=" ' + i + '" href="/union/index.php?union_card_select=0&p=' + i + '#filetop">&nbsp' + i + '&nbsp</a></li>';
			}
			if (location.pathname == "/card/trade_card.php") {
				addLink += '<li><a title=" ' + i + '" href="/card/trade_card.php?p=' + i + '#filetop">&nbsp' + i + '&nbsp</a></li>';
			}
		}

		if (maxPage > 20) {
			if (i == Math.round(maxPage / 2)) {
				addLink += '<br><br>';
			}
		}
	}
	addLink += '</ul></div>';

	// ページャーの追加 ================================================================================================================
	GM_addStyle("#rotate div.rotateInfo ul.pager	{ background: none repeat scroll 0 center transparent; clear: none; float: none; line-height: 2; margin: 0; padding: 0; text-align: right; width: 420px; }");	// 本拠地
	GM_addStyle("ul.pager li a			{ background: none repeat scroll 0 0 #666666;    color: #FFFFFF !important;    padding: 3px 4px;    text-decoration: none !important;}");

	j$("#card_uraomote-omote").after(addLink);
}

function xpath(query,targetDoc) {
	return document.evaluate(query, targetDoc, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

