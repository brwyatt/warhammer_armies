api="https://wh.brwyatt.net/api"
function update_title(title){
	base_title = "Warhammer Army Browser";
	if(title == null){
		title = base_title;
	} else {
		title = base_title+" - "+title;
	}
	document.title = title;
	$("#title").html(title);
}
function load_main(uuid) {
	$("#main").html("Loading...");
	$.ajax({
		url: api+"/"+uuid,
		success: function(result) {
			update_title(result["Type"]+": "+result["Name"]);
			content=JSON.stringify(result, null, 4);
			$("#main").html("<pre>"+content+"</pre>");
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
				content.push(result[i]["Type"]+": <a href=\"#"+result[i]["UUID"]+"\">"+result[i]["Name"]+"</a>");
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
				content+="<li>"+result[i]["Type"]+": <a href=\"#"+result[i]["UUID"]+"\">"+result[i]["Name"]+"</a></li>";
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
