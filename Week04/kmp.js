function kmp(source, pattern) {
  //跳转表格
  let table = new Array(pattern.length).fill(0);
  {
    let i = 1, j = 0;

    while (i < pattern.length) {
      if (pattern[i] === pattern[j]) {
        ++i, ++j;
        table[i] = j;
      } else {
        if (j > 0) {
          j = table[j];
        } else {
          //table[i] = j;
          ++i;
        }
      }
    }
    console.log(table)
  }

  // 匹配
  {
    let i = 0, j = 0;
    while (i < source.length) {

      if (pattern[j] === source[i]) {
        ++i, ++j;
      } else {
        if (j > 0) {
          j = table[j];
        } else {
          ++i;
        }
      }
      if (j === pattern.length) {
        return true;
      }
    }
    return false;
  }

}
//kmp("", "abcdabce")//[ 0, 0, 0, 0, 0, 1, 2, 3 ]
//kmp("", "abababc")//[ 0, 0, 0, 1, 2, 3, 4 ]
//kmp("", "aabaaac")//[ 0, 0, 1, 0, 1, 2, 2 ]

console.log(kmp("helxlo", "ll"))
