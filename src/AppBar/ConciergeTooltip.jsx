import React, { Fragment } from 'react';

const ConciergeTooltip = () => (
  <Fragment>
    <div className="tui-concierge-tooltip-arrow" />
    <div className="tui-concierge-tooltip">
      <div className="tui-concierge-tooltip-right">
        <span className="tui-concierge-beta-badge inverted">
          Beta
        </span>
      </div>
      <div className="tui-concierge-tooltip-left">
        <h2>
          Need help?
        </h2>
        <p>
          We have resources to get you unstuck.
        </p>
      </div>
    </div>
  </Fragment>
);

export default ConciergeTooltip;
