// ① 获取页面元素
const form = document.querySelector('#add-form');
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const ratingInput = document.querySelector('#rating-input');
const tip = document.querySelector('#tip');
const list = document.querySelector('#book-list');
const searchInput = document.querySelector('#search-input');

// ② 数据数组
let books = [];

// 保存函数（每次改动数据后调用）
const save = () => {
  localStorage.setItem('books', JSON.stringify(books));
};

// ③ render 统一渲染（和 todo-app 一样的套路）
const render = () => {
  list.innerHTML = '';

  // 搜索过滤
  const keyword = searchInput.value.trim().toLowerCase();
  const shown = books.filter(b =>
    b.title.toLowerCase().includes(keyword)
  );

  if (shown.length === 0) {
    const li = document.createElement('li');
    li.textContent = '暂无图书';
    list.appendChild(li);
    return;
  }

  shown.forEach((book, index) => {
    const li = document.createElement('li');
    li.textContent = `${book.title} - ${book.author}（${book.rating}分）`;

    // 删除按钮
    const del = document.createElement('span');
    del.textContent = '删除';
    del.className = 'del';
    del.addEventListener('click', () => {
      books.splice(index, 1);
      save();
      render();
    });
    li.appendChild(del);

    list.appendChild(li);
  });
};

// ④ 表单提交：添加 + 校验
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const rating = Number(ratingInput.value);

  // 输入校验
  if (title === '' || author === '') {
    tip.textContent = '书名和作者不能为空';
    return;
  }
  if (rating < 1 || rating > 10) {
    tip.textContent = '评分必须在 1~10 之间';
    return;
  }

  books.push({ title, author, rating });
  tip.textContent = '';
  titleInput.value = '';
  authorInput.value = '';
  ratingInput.value = '';
  save();
  render();
});

// ⑤ 搜索框实时过滤
searchInput.addEventListener('input', render);
// 从 localStorage 读取已有数据（页面打开时）
const saved = localStorage.getItem('books');
if (saved) books = JSON.parse(saved);
render();  // 页面打开时先画一次