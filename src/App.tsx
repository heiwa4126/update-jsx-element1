import React from "react";

const img1 = "150x150.png";
const img2 = "150x150-2.png";

function ImageTest1() {
  return (
    <div>
      <img src={img1} /> <img src={img1} />
    </div>
  );
}

/**
 * element中の&lt;img&gt;のsrc=を newSrcに置き換える
 * @param element 置き換え元の JSX.Element
 * @param newSrc 置き換えるイメージのURL
 * @returns 更新されたJSX.Element。オリジナルのクローン
 */
function updateImgSrc(element: JSX.Element, newSrc: string): JSX.Element {
  if (element.type === "img") {
    return React.cloneElement(element, { src: newSrc });
  }

  const children = React.Children.map(element.props.children, (child) => {
    if (React.isValidElement(child)) {
      return updateImgSrc(child, newSrc);
    }
    return child;
  });

  return React.cloneElement(element, {}, children);
}

function App() {
  const test1 = ImageTest1();
  const test2 = updateImgSrc(test1, img2);
  return (
    <>
      <div>original</div>
      {test1}
      <div>update</div>
      {test2}
    </>
  );
}

export default App;
