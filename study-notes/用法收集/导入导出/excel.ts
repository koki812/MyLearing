const exportFile = (data: Blob) => {
  const blob = new Blob([data], {
    type: "application/vnd.ms-excel;charset=utf-8",
  });

  const fileName = "文件名" + new Date().getTime() + ".xls"; // 我这里是文件名加上时间，可以根据自己需求来

  const elink = document.createElement("a"); // 创建a标签

  elink.download = fileName; // 为a标签添加download属性  //命名下载名称
  elink.style.display = "none";
  elink.href = URL.createObjectURL(blob);
  document.body.appendChild(elink);
  elink.click(); // 点击下载
  URL.revokeObjectURL(elink.href); // 释放URL 对象
  document.body.removeChild(elink); // 释放标签
};
