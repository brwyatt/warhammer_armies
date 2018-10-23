api="https://wh.brwyatt.net/api"
function update_title(title, header_alt){
	base_title = "Warhammer Army Browser";
	if(title == null){
		title = base_title;
	} else {
		title = base_title+" - "+title;
	}
	document.title = title;

	if(header_alt == null) {
		header = title;
	} else {
		header = base_title+" - "+header_alt;
	}
	$("#title").html(header);
}
function render_with_tooltip(data, element_name) {
	ret = '';
	if(element_name in data) {
		ret = data[element_name];
		if(element_name+"_Translation" in data) {
			ret = "<span class=\"tooltip\">"+ret+"<span class=\"tooltiptext\">"+data[element_name+"_Translation"]+"</span></span>"
		}
	}
	return ret;
}
function load_unit_data(uuid) {
	$("#unitdata").html("Loading...");
	$("#unitdata").html("Unimplemented!");
}
function load_wargear(uuid_list) {
	$("#wargear").html("Loading...");
	$("#wargear").html("Unimplemented!");
}
function load_main(uuid) {
	$("#main").html("Loading...");
	$.ajax({
		url: api+"/"+uuid,
		success: function(result) {
			update_title(result["Type"]+": "+result["Name"],
				render_with_tooltip(result, "Type")+": "+render_with_tooltip(result, "Name"));
			content=[];
			if("img" in result) {
				content.push("<div id=\"pictureframe\"><img src=\"/img/"+result["img"]+"\" /></div>");
			}
			content.push("<div id=\"infopane\">");
			content.push("<table class=\"objectdata\">");
			content.push("<tr><th>Name</th><td>"+render_with_tooltip(result, "Name")+"</td></tr>");
			content.push("<tr><th>Type</th><td>"+render_with_tooltip(result, "Type")+"</td></tr>");
			content.push("</table>");
			if("ObjectType" in result && result["ObjectType"] == "unit") {
				if("UnitData" in result) {
					content.push("<h4>Unit Data</h4><div id=\"unitdata\"></div>");
				}
				if("Wargear" in result) {
					content.push("<h4>Wargear</h4><div id=\"wargear\"></div>");
				}
			}
			content.push("</div>");
			$("#main").html(content.join(''));
			if("ObjectType" in result && result["ObjectType"] == "unit") {
				if("UnitData" in result) {
					load_unit_data(result["UnitData"]);
				}
				if("Wargear" in result) {
					load_wargear(result["Wargear"]);
				}
			}
		},
		error: function(result) {
			update_title();
			$("#main").html("");
		}
	});
}
function load_nav(uuid) {
	$("#nav").html("Loading...");
	home = "<a href=\"#\">Home</a>";
	$.ajax({
		url: api+"/"+uuid+"/ancestors",
		success: function(result) {
			content=[home];
			for(i in result){
				content.push(render_with_tooltip(result[i], "Type")+": <a href=\"#"+result[i]["UUID"]+"\">"+render_with_tooltip(result[i], "Name")+"</a>");
			}
			$("#nav").html(content.join(' &gt; '));
		},
		error: function(result) {
			$("#nav").html(home);
		}
	});
}
function load_children(uuid) {
	$("#children").html("Loading...");
	$.ajax({
		url: api+"/"+uuid+"/children",
		success: function(result) {
			content="";
			for(i in result){
				content+="<li>"+render_with_tooltip(result[i], "Type")+": <a href=\"#"+result[i]["UUID"]+"\">"+render_with_tooltip(result[i], "Name")+"</a></li>";
			}
			$("#children").html("<ul>"+content+"</ul>");
		},
		error: function(result) {
			$("#children").html("");
		}
	});
}
function load() {
	uuid = "None";
	if(window.location.hash){
		uuid = window.location.hash.substring(1);
	}
	load_main(uuid)
	load_nav(uuid)
	load_children(uuid)
}
