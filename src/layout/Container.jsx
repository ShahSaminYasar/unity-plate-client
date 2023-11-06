import PropTypes from "prop-types";

const Container = ({ children, className }) => {
  return (
    <section className={`max-w-[1200px] mx-auto ${className}`}>
      {children}
    </section>
  );
};

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Container;
