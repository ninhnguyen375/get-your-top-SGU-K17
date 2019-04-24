const makeupArray = arr => {
  return arr.sort((a, b) => b - a);
};

const calculateTop = ({ student = { mssv: '', diem: '' }, students = [] }) => {
  let top = 0;

  for (let i = 0; i < students.length; i++) {
    if (parseFloat(student.diem) < parseFloat(students[i].diem)) {
      top++;
    } else {
      break;
    }
  }
  return top;
};

const getTop = async info => {
  const btnSubmit = document.querySelector('input[type=submit]');
  const result = document.querySelector('#result');
  let student;
  // add loading
  btnSubmit.value = 'Loading...';
  btnSubmit.setAttribute('type', 'button');

  try {
    student = await axios.get(`/api/diemhe4_k${info.K}/${info.mssv}`);
  } catch (e) {
    result.innerHTML = `
      <p class="alert alert-danger">
        Khong co du lieu MSSV ${info.mssv}, K${info.K} :((
      </p>
    `;
  }
  let students = await axios.get(`/api/diemhe4_k${info.K}`);

  // remove loading
  btnSubmit.value = 'Get Your Top';
  btnSubmit.setAttribute('type', 'submit');

  student = student.data;
  students = students.data.sort(
    (a, b) => parseFloat(b.diem) - parseFloat(a.diem)
  );

  if (!student) {
    result.innerHTML = `
        <p class="alert alert-danger">
          Không tìm đc MSSV ${info.mssv} :((
        </p>
      `;
    return;
  }

  const top = calculateTop({ student, students }) + 1;

  result.innerHTML = `
      <p class="alert alert-success">
        Với Điểm hệ 4 là ${
          student.diem
        }, bạn giành cho mình top <b>${top}</b> trong ${
    students.length
  } sinh viên khóa ${info.K} :)))
      </p>
    `;
};

window.onload = () => {
  const form = document.querySelector('form');
  form.onsubmit = e => {
    e.preventDefault();

    const mssv = document.querySelector('input[name=mssv]').value;
    const K = document.querySelector('#K').value;

    getTop({ mssv, K });
  };
};
