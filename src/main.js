const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const bookList = document.getElementById('book-list');

// 🔹 ➊ [여기!] Enter 키로 검색되게 만들기
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});

// 🔹 ➋ 버튼 클릭 시 검색
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (!query) return alert('검색어를 입력하세요.');

  fetch(`https://dapi.kakao.com/v3/search/book?target=title&query=${encodeURIComponent(query)}`, {
    headers: {
      Authorization: 'KakaoAK 3148c1c4aaaa68069d977f6b42966433'
    }
  })
    .then(res => res.json())
    .then(data => {
      bookList.innerHTML = ''; // 기존 목록 초기화
      const books = data.documents.slice(0, 25); // 최대 25개만 보여주기


      if (books.length === 0) {
        bookList.innerHTML = '<li>검색 결과가 없습니다.</li>';
        return;
      }

      books.forEach(book => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${book.title}</strong><br/>
          <em>저자: ${book.authors.join(', ')}</em><br/>
          <img src="${book.thumbnail}" alt="책 썸네일"/><br/>
          <a href="${book.url}" target="_blank">상세 보기</a>
        `;
        bookList.appendChild(li);
      });
    })
    .catch(error => {
      console.error('에러 발생:', error);
      alert('도서 검색 중 문제가 발생했습니다.');
    });
});
