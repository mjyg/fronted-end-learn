function yideng(num){
  num = num+10;
  num = num*3;
  return Math.sin(num)
}
const result = yideng(20)
const data = result + '外部数据'
const data2='额外的数据'
export { data, data2}