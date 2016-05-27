const app = angular.module('RedditClone', ['ngAnimate']);

app.controller('NewPost', function($scope){
  window.scope = $scope;
  let loremPost2 = new Post('Lorem Post', 'Lorem Cat', 'http://lorempixel.com/400/400/cats', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe, ea expedita architecto dolore iusto consequatur dicta maiores. Nobis nam, totam reprehenderit voluptatem aliquid cupiditate provident hic, iure maxime, dolore nihil. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis labore alias fugiat vero repellendus provident perferendis facere nihil, aliquid unde possimus impedit eum reiciendis, a libero delectus at! Minima, ipsa. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe, modi facilis quis labore ducimus! Soluta magnam, sit minima consectetur, quo, dolore quibusdam sequi laborum repudiandae officiis deserunt ullam vel molestias! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe, modi facilis quis labore ducimus! Soluta magnam, sit minima consectetur, quo, dolore quibusdam sequi laborum repudiandae officiis deserunt ullam vel molestias!');
  let loremPost = new Post('title', 'cat', 'http://lorempixel.com/400/400/cats', 'lorem');

  $scope.vm = {
    orderType: 'votes',
    orderReverse: true,
    postForm: true,
    posts: [loremPost, loremPost2],
    newPost: {
      title: '',
      author: '',
      img: '',
      desc: '',
    },
    showAddPost: false,
    postSubmitted: false,
    searchPosts: ''
  };

  $scope.changeOrder = function(sort){
    $scope.vm.orderType = sort;
    $scope.vm.orderReverse = sort === 'title' ? false : true;
  };

  $scope.showNewPostForm = function(){
    $scope.vm.showAddPost = !$scope.vm.showAddPost;
  }

  $scope.addPost = function(){
    if($scope.NewPostForm.$valid){
      let post = new Post($scope.vm.newPost.title, $scope.vm.newPost.author, $scope.vm.newPost.img, $scope.vm.newPost.desc);
      $scope.vm.posts.push(post);
      $scope.vm.showAddPost = false;
      $scope.vm.newPost = {
        title: '',
        author: '',
        img: '',
        desc: '',
      };
    } else {
      $scope.vm.postSubmitted = true;
    }
  };
});

function Comment(author, text){
  this.author = author;
  this.text = text;
}

function Post(title, author, img, desc){
  this.title = title;
  this.author = author;
  this.img = img;
  this.desc = desc;
  this.date = moment().calendar();
  this.votes = 0;
  this.comments = [];
  this.newComment = {
    author: '',
    text: ''
  };
  this.showComments = false;
  this.showAddComment = false;
  this.commentSubmitted = false;
}

Post.prototype.addVote = function(op){
  this.votes = eval(this.votes + op + 1);
};

Post.prototype.showCommentsList = function(){
  this.showComments = !this.showComments;
};

Post.prototype.showNewCommentForm = function(){
  this.showAddComment = !this.showAddComment;
}

Post.prototype.addComment = function(){
  let comment = new Comment(this.newComment.author, this.newComment.text);
  this.comments.push(comment);
  this.showAddComment = false;
  this.newComment = {
    author: '',
    text: ''
  };
};