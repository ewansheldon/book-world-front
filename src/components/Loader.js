import React from "react";

const styles = {
    image: {

    },
    wrapper: {
        height: '100%',
        textAlign: 'center'
    }
}

const Loader = () => {
  return (
      <div style={styles.wrapper}>
        <img style={styles.image} src="../../dist/assets/loading.svg" />
      </div>
  )
}

export default Loader;