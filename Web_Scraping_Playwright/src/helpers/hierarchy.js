export default function hierarchy(indentNum) {
  // console.log(`Calculating hierarchy for indent: ${indentNum}`); // Debug line
  let commentHierarchy = 'parent';
  if (indentNum > 0) {
    const childLevel = Math.floor(indentNum / 40);
    commentHierarchy = `child-${childLevel}`;
    // console.log(`Hierarchy calculated as: ${commentHierarchy}`); // Debug line
  }
  return commentHierarchy;
}
