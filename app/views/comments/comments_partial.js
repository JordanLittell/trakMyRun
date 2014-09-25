<div class="col-sm-12">
		<hr>
		<h3>Comments</h3>
			<% if(post.comments()) { %> 
			<ul>
				<% post.comments().each(function(comment){ %>
					<li><a href=<%="#users/"+comment.userId()%>><%= comment.username() %>:</a> <%= comment.get('content') %> </li>
				<%	}); %>
			</ul>

			<% } else { %>
			<p>There are no comments at this time.</p>
				<% } %>
		</div>