<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="com.mercadopago.MP"%>
<%@page import="org.codehaus.jettison.json.JSONObject"%>

<%
	MP mp = new MP("ASJBxWW7q7mUFxebpmJYamjkbODQGpVgd3hyyBY7bzTd1R9YyrHcoMvoctSkxSeJCzUtS-JVGnXZ1_go", "EF0LQTEYTdVEck8aqRVKS--OwcM9YchdyVcvKLpk-CDezn69l2KVtJ_2pr3Hcc3dMYsQoyMkHsxkPs9m");
	String preapprovalData = "...";
	JSONObject preapproval = mp.createPreapprovalPayment(preapprovalData);
	String sandboxInitPoint = preapproval.getJSONObject("response").getString("sandbox_init_point");
%>

<!DOCTYPE html>
<html>
	<head>
		<title>Subscribe</title>
	</head>
	<body>
		<a href="<%= sandboxInitPoint %>">Subscribe</a>
	</body>
</html>