import React from "react";

export default function Numbers(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  return (
    <div className="buttons">
      <button style={styles} onClick={props.hold} className="numbers">
        {props.number}
      </button>
    </div>
  );
}
