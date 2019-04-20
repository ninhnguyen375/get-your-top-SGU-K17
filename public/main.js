// Statistics of students born in a month
// const getData = async () => {
//   const res = await axios.get('/api');
//   const monthWithAmount = countAmountOfMonth(getMonth(res.data.studentName));
//   const root = document.querySelector('#root');
//   let amount = 0;
//   console.log(res.data);

//   const monthWithTheMostStudentsBorn = monthWithAmount.indexOf(
//     Math.max(...monthWithAmount)
//   );
//   for (let i = 1; i <= 12; i++) {
//     amount += monthWithAmount[i];
//   }
//   for (let i = 1; i <= 12; i++) {
//     root.innerHTML += `<div><b>Tháng ${i} </b>: ${
//       monthWithAmount[i]
//     } - ${getPercent(monthWithAmount[i], amount)}%</div>`;
//   }
//   root.innerHTML += `<br/><p><b>=> Tháng ${monthWithTheMostStudentsBorn}</b> là tháng có sinh nhật của nhiều SV nhất, với <b>${
//     monthWithAmount[monthWithTheMostStudentsBorn]
//   }</b> sinh viên và tỉ lệ là <b>${getPercent(
//     monthWithAmount[monthWithTheMostStudentsBorn],
//     amount
//   )}%</b></p>`;
//   root.innerHTML += `<hr/><b>NOTE:</b><br/>
//         - Dữ liệu dựa trên ${amount} sinh viên khoa <b> Quản trị kinh doanh/Kinh doanh quốc tế </b> khóa 18 <br/>
//         - Dữ liệu chỉ mang tính chất kham khảo, chưa được xác thực!</br>`;
// };

const getPercent = (num, max) => {
  return ((num * 100) / max).toPrecision(2);
};

const countAmountOfMonth = months => {
  const monthWithAmount = [];
  monthWithAmount[0] = 0;
  for (let i = 1; i <= 12; i++) {
    monthWithAmount[i] = 0;
  }
  months.forEach(month => {
    if (month == '01') monthWithAmount[1]++;
    if (month == '02') monthWithAmount[2]++;
    if (month == '03') monthWithAmount[3]++;
    if (month == '04') monthWithAmount[4]++;
    if (month == '05') monthWithAmount[5]++;
    if (month == '06') monthWithAmount[6]++;
    if (month == '07') monthWithAmount[7]++;
    if (month == '08') monthWithAmount[8]++;
    if (month == '09') monthWithAmount[9]++;
    if (month == '10') monthWithAmount[10]++;
    if (month == '11') monthWithAmount[11]++;
    if (month == '12') monthWithAmount[12]++;
  });
  return monthWithAmount;
};

const getMonth = lines => {
  const months = [];
  lines.forEach(item => {
    if (item) {
      const month = item.split('/')[1];
      console.log(month);
      months.push(month);
    }
  });
  return months;
};

const makeupArray = arr => {
  return [...new Set(arr)]
    .filter(item => item != '' && item != null)
    .sort((a, b) => b - a);
};

const getTop = async studentID => {
  let res = await axios.get(`/api/${studentID}`);
  const btnSubmit = document.querySelector('input[type=submit]');
  // add loading
  btnSubmit.value = 'Loading...';
  btnSubmit.setAttribute('type', 'button');
  setTimeout(async () => {
    res = await axios.get(`/api/${studentID}`);
    // remove loading
    btnSubmit.value = 'Get Your Top';
    btnSubmit.setAttribute('type', 'submit');

    let { diemHe4, diemHe4Cua1SV } = res.data;
    const result = document.querySelector('#result');
    if (!diemHe4Cua1SV) {
      result.innerHTML = `
        <p class="alert alert-danger">
          Không tìm đc MSSV ${studentID} :((
        </p>
      `;
      return;
    }
    diemHe4 = makeupArray(diemHe4);
    const studentQuantity = res.data.diemHe4.filter(
      item => item != '' && item != null
    ).length;
    const top = diemHe4.findIndex(e => e === diemHe4Cua1SV);

    result.innerHTML = `
      <p class="alert alert-success">
        Với Điểm hệ 4 là ${diemHe4Cua1SV}, bạn giành cho mình top <b>${top}</b> trong ${studentQuantity} sinh viên khóa 17 :)))
      </p>
    `;
  }, 5000);
};

window.onload = () => {
  const form = document.querySelector('form');
  form.onsubmit = e => {
    e.preventDefault();

    const mssv = document.querySelector('input[name=mssv]').value;
    getTop(mssv);
  };
};
