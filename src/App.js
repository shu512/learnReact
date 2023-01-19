import React, { useMemo, useRef, useState } from 'react';
import ClassCounter from './components/ClassCounter';
import Counter from './components/Counter';
import PostForm from './components/PostForm';
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import PostFilter from './components/PostFilter';
import MySelect from './components/UI/select/MySelect';
import './styles/App.css';
import MyModal from './components/UI/MyModal/MyModal';
import { usePosts } from './hooks/usePosts';

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'Javascript', body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.'},
    {id: 2, title: 'Javascript2', body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.'},
    {id: 3, title: 'Javascript 3', body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.'},
  ]);

  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const createPost = (post) => {
    setPosts([...posts, post]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  };

  return (
    <div className="App">
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter 
        filter={filter}
        setFilter={setFilter}
      />
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов 1"/>
    </div>
  );
}

export default App;
