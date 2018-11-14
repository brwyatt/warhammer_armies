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
function render_tooltip(text, tooltip_text){
	return "<span class=\"tooltip\">"+text+"<span class=\"tooltiptext\">"+tooltip_text+"</span></span>";
}
function render_key_with_tooltip(data, element_name) {
	ret = '';
	if(element_name in data) {
		ret = data[element_name];
		if(element_name+"_Translation" in data) {
			ret =  render_tooltip(ret, data[element_name+"_Translation"]);
		}
	}
	return ret;
}
function load_model_data(uuid) {
	$("#modeldata").html("Loading...");
	content=[];
	content.push("<table class=\"datatable\">");
	content.push("<tr>");
	content.push("<th>Name</th>");
	content.push("<th>"+render_tooltip("M", "Movement")+"</th>");
	content.push("<th>"+render_tooltip("WS", "Weapon Skill")+"</th>");
	content.push("<th>"+render_tooltip("BS", "Ballistic Skill")+"</th>");
	content.push("<th>"+render_tooltip("S", "Strength")+"</th>");
	content.push("<th>"+render_tooltip("T", "Toughness")+"</th>");
	content.push("<th>"+render_tooltip("W", "Wounds")+"</th>");
	content.push("<th>"+render_tooltip("A", "Attack")+"</th>");
	content.push("<th>"+render_tooltip("Ld", "Leadership")+"</th>");
	content.push("<th>"+render_tooltip("Sv", "Save")+"</th>");
	content.push("</tr>");
	content.push("<tr id=\""+uuid+"\"><td colspan=\"10\">Loading...</td></tr>");
	content.push("</table>");
	$("#modeldata").html(content.join(''));
	$.ajax({
		url: api+"/"+uuid,
		success: function(result) {
			content=[];
			elements = ["Name", "Movement", "Weapon Skill", "Ballistic Skill", "Strength", "Toughness", "Wounds", "Attack", "Leadership", "Save"];
			for(i in elements){
				content.push("<td>");
				if(elements[i] in result){
					content.push(result[elements[i]]);
				} else {
					content.push("-");
				}
				content.push("</td>");
			}
			$("#"+result['UUID']).html(content.join(''));
		},
		error: function(result) {
		}
	});
}
function load_wargear(uuid_list) {
	$("#wargear").html("Loading...");
	content=[];
	content.push("<div id=\"wargear_ranged\" class=\"hidden\">");
	content.push("<div class=\"sectionheader\">Ranged</div>");
	content.push("<div class=\"indent\">");
	content.push("<table class=\"datatable\">");
	content.push("<tr>");
	content.push("<th>Weapon</th>");
	content.push("<th>Range</th>");
	content.push("<th>Type</th>");
	content.push("<th>"+render_tooltip("S", "Strength")+"</th>");
	content.push("<th>"+render_tooltip("AP", "Armor Piercing")+"</th>");
	content.push("<th>"+render_tooltip("D", "Damage")+"</th>");
	content.push("<th>Abilities</th>");
	content.push("</tr>");
	content.push("</table>");
	content.push("</div>");
	content.push("</div>");
	content.push("<div id=\"wargear_melee\" class=\"hidden\">");
	content.push("<div class=\"sectionheader\">Melee</div>");
	content.push("<div class=\"indent\">");
	content.push("<table class=\"datatable\">");
	content.push("<tr>");
	content.push("<th>Weapon</th>");
	content.push("<th>Range</th>");
	content.push("<th>Type</th>");
	content.push("<th>"+render_tooltip("S", "Strength")+"</th>");
	content.push("<th>"+render_tooltip("AP", "Armor Piercing")+"</th>");
	content.push("<th>"+render_tooltip("D", "Damage")+"</th>");
	content.push("<th>Abilities</th>");
	content.push("</tr>");
	content.push("</table>");
	content.push("</div>");
	content.push("</div>");
	content.push("<div id=\"wargear_support\" class=\"hidden\">");
	content.push("<div class=\"sectionheader\">Support Systems</div>");
	content.push("<div class=\"indent\">");
	content.push("<table class=\"datatable\">");
	content.push("<tr>");
	content.push("<th>System</th>");
	content.push("<th>Effect</th>");
	content.push("</tr>");
	content.push("</table>");
	content.push("</div>");
	content.push("</div>");
	$("#wargear").html(content.join(''));
	for(i in uuid_list) {
		$.ajax({
			url: api+"/"+uuid_list[i],
			success: function(result) {
				content=[];
				if(result["WargearType"] == "Ranged"){
					table_id = "wargear_ranged"
					elements = ["Name", "Range", "Type", "Strength", "Armor Piercing", "Damage", "Abilities"];
				}if(result["WargearType"] == "Melee"){
					table_id = "wargear_melee"
					elements = ["Name", "Range", "Type", "Strength", "Armor Piercing", "Damage", "Abilities"];
				} if(result["WargearType"] == "Support System"){
					table_id = "wargear_support"
					elements = ["Name", "Effect"];
				}
				for(j in elements){
					content.push("<td>");
					if(elements[j] in result){
						content.push(result[elements[j]]);
					} else {
						content.push("-");
					}
					content.push("</td>");
				}
				// Unhide table
				classes = $("div#"+table_id).attr("class").split(" ");
				hidden_index = classes.indexOf("hidden");
				if(hidden_index > -1){
					classes.splice(hidden_index, 1).join(" ");
					$("div#"+table_id).attr("class", classes);
				}

				table_length = $("div#"+table_id+" table tr").length;
				if(table_length % 2 == 0){
					classes = "evenrow";
				} else {
					classes = "oddrow";
				}
				$("div#"+table_id+" table tr:last").after("<tr class=\""+classes+"\">"+content.join("")+"</tr>");
			},
			error: function(result) {
			}
		});
	}
}
function load_main(uuid) {
	$("#main").html("Loading...");
	$.ajax({
		url: api+"/"+uuid,
		success: function(result) {
			update_title(result["Type"]+": "+result["Name"],
				render_key_with_tooltip(result, "Type")+": "+render_key_with_tooltip(result, "Name"));
			content=[];
			if("img" in result) {
				content.push("<div id=\"pictureframe\"><img src=\"/img/"+result["img"]+"\" /></div>");
			}
			content.push("<div id=\"infopane\">");
			content.push("<table class=\"objectdata\">");
			content.push("<tr><th>Name</th><td>"+render_key_with_tooltip(result, "Name")+"</td></tr>");
			content.push("<tr><th>Type</th><td>"+render_key_with_tooltip(result, "Type")+"</td></tr>");
			content.push("</table>");
			if("ObjectType" in result && result["ObjectType"] == "model") {
				if("ModelData" in result) {
					content.push("<div class=\"sectionheader\">Model Data</div><div id=\"modeldata\" class=\"indent\"></div>");
				}
				if("Wargear" in result) {
					content.push("<div class=\"sectionheader\">Wargear</div><div id=\"wargear\" class=\"indent\"></div>");
				}
			}
			content.push("</div>");
			$("#main").html(content.join(''));
			if("ObjectType" in result && result["ObjectType"] == "model") {
				if("ModelData" in result) {
					load_model_data(result["ModelData"]);
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
				content.push(render_key_with_tooltip(result[i], "Type")+": <a href=\"#"+result[i]["UUID"]+"\">"+render_key_with_tooltip(result[i], "Name")+"</a>");
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
				content+="<li>"+render_key_with_tooltip(result[i], "Type")+": <a href=\"#"+result[i]["UUID"]+"\">"+render_key_with_tooltip(result[i], "Name")+"</a></li>";
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
