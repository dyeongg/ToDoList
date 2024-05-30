document.addEventListener('DOMContentLoaded', (event) => {
  // "닫기" 버튼을 만들고 각 리스트 항목에 추가하는 함수
  function createCloseButton(li) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    span.onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
      saveToDoList(); // 리스트 삭제 시 저장
    }
  }

  // 날짜와 시간을 원하는 형식으로 변환하는 함수
  function formatDateTime(dateTime) {
    let date = new Date(dateTime);
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let period = hours >= 12 ? "오후" : "오전";
    
    hours = hours % 12 || 12;  // 0시는 12시로 표시
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${day}일 ${period} ${hours}시 ${minutes}분`;
  }
  
  // 기존 리스트 항목에 "닫기" 버튼 추가
  var myNodelist = document.getElementsByTagName("LI");
  for (var i = 0; i < myNodelist.length; i++) {
    createCloseButton(myNodelist[i]);
  }

  // 리스트 항목을 클릭할 때 "checked" 클래스를 추가/제거
  var list = document.querySelector('ul');
  list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
      saveToDoList(); // 상태 변경 시 저장
    }
  }, false);

  // "추가" 버튼을 클릭하면 새로운 리스트 항목을 생성
  window.newElement = function() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var inputTime = document.getElementById("myTime").value;
    var t = document.createTextNode(inputValue);
    var timeSpan = document.createElement("SPAN");
    timeSpan.className = "time";
    timeSpan.textContent = formatDateTime(inputTime);
    
    li.appendChild(t);
    if (inputValue === '') {
      alert("항목을 입력하세요!");
    } else if (inputTime === '') {
      alert("시간을 입력하세요!");
    } else {
      li.appendChild(timeSpan);
      document.getElementById("myUL").appendChild(li);
      saveToDoList(); // 추가 시 저장
    }
    document.getElementById("myInput").value = "";
    document.getElementById("myTime").value = "";

    createCloseButton(li);
  }

  // 로컬 스토리지에 투두리스트 항목을 저장하는 함수
  function saveToDoList() {
    var todoListItems = document.querySelectorAll('#myUL li');
    var todoList = [];
    todoListItems.forEach(function(item) {
      todoList.push({
        text: item.firstChild.textContent,
        time: item.querySelector('.time').textContent
      });
    });
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }
});
