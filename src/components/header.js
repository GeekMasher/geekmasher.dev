import PropTypes from "prop-types"
import React from "react"


const Header = ({ siteTitle }) => (
  <header
    style={{
      backgroundColor: `#eae8db`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        alignItems: 'center',
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1
        style={{
          margin: '1rem',
          fontSize: '2rem',
          textAlign: 'center',
          width: 'auto'
        }}
      >
        GeekMasher Development Blog
      </h1>
      
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
