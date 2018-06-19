import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getPost } from '../../actions/postActions';
import Spinner from '../common/Spinner';
import PostItem from '../posts/PostItem';
import isEmpty from '../../validation/is-empty';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';

class Post extends Component {
	static propTypes = {
		post: PropTypes.object.isRequired,
		getPost: PropTypes.func.isRequired,
	};

	componentDidMount() {
		this.props.getPost(this.props.match.params.id);
	}
	render() {
		const { post, loading } = this.props.post;
		let postContent;
		if (isEmpty(post) || loading) {
			postContent = <Spinner />;
		} else {
			postContent = (
				<div>
					<PostItem post={post} showActions={false} />
					<CommentForm postId={post._id} />
					<CommentFeed postId={post._id} comments={post.comments} />
				</div>
			);
		}
		return (
			<div className="post">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<Link to="/feed" className="btn btn-light mb-3">
								Back To Feed
							</Link>
							{postContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	({ post }) => ({ post }),
	{ getPost }
)(Post);