/**
*
* DrugBody
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'
import { Link } from 'react-router'
import { TabGroup, Tab } from 'material-tabs'
import Alert from '../../components/Alert'

import messages from './messages'

const tabStyle = {
  color: '#ee6e73',
  fontWeight: 500,
  whiteSpace: 'nowrap',
}

const defaultTabs = messages.tabs.defaultTabs

class DrugBody extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super()
    this.tabSwitch = this.tabSwitch.bind(this)
    // show tab only if there is content
    this.tabs = defaultTabs.filter((tab) => (Array.isArray(props.drug[tab.link]) && props.drug[tab.link].length > 0) || (!Array.isArray(props.drug[tab.link]) && props.drug[tab.link] !== null))
  }
  mapTabs() {
    const tabs = defaultTabs.filter((tab) => (Array.isArray(this.props.drug[tab.link]) && this.props.drug[tab.link].length > 0) || (!Array.isArray(this.props.drug[tab.link]) && this.props.drug[tab.link] !== null))
    return tabs.map((tab, index) => {
      if ((Array.isArray(this.props.drug[tab.link]) && this.props.drug[tab.link].length > 10) || this.props.drug[tab.link] !== null) { // show only tabs that has content
        return (
          <Link to={`/drugs/${this.props.params.drug}/${tab.link}`} key={index}>
            <Tab style={tabStyle}>
              {tab.label}
            </Tab>
          </Link>
        )
      }
      return null
    })
  }
  tabSwitch() {
    const { drug } = this.props
    switch (this.props.params.tab) {
      case 'overview':
        return (
          <Markdown source={drug.summary} />
        )
      case 'effects':
        return (
          <div>
            <Alert icon="info_outline" type="info">
              {messages.alert.defaultMessage}
            </Alert>
            <ul className="p-0 list-unstyled row">
              {drug.effects.map((effect, index) => (
                <li key={index} className="col-12 col-md-6 mb-3">
                  <div className="card">
                    <div className="p-3">
                      <div className="d-flex align-items-center">
                        <h6 style={{ flex: 1 }}>{effect.name}</h6>
                        {/* <div className="d-flex flex-column">
                              <i className="material-icons">keyboard_arrow_up</i>
                              <i className="material-icons">keyboard_arrow_down</i>
                            </div> */}
                      </div>
                    </div>
                  </div>
                </li>
                  ))}
            </ul>
          </div>
        )
      case 'health':
        return (
          <Markdown source={drug.health} />
        )
      case 'law':
        return (
          <Markdown source={drug.law} />
        )
      case 'experiences':
        return (
          <div>
            {drug.experiences.length > 0 && (
              <ul className="row list-unstyled">
                {drug.experiences.map((experience) =>
                  <li className="col-6 mb-3">
                    <Link to={`/experiences/${experience.id}`} key={experience.id}>
                      <div className="card">
                        <div className="card-body">
                          <h5 className="mb-3">{experience.title}</h5>
                          <small>
                            {drug.name} {experience.drugs.length > 1 && `+ ${experience.drugs.length - 1}`}
                          </small>
                        </div>
                      </div>
                    </Link>
                  </li>
              )}
              </ul>
            )}
          </div>
        )
      default:
        return (
          <Markdown source={drug.summary} />
        )
    }
  }
  render() {
    return (
      <div className="card" style={{ borderRadius: '4px' }}>
        <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
          <div style={{ minWidth: this.tabs.length > 3 ? 560 : 320, margin: '0 auto' }}>
            <TabGroup defaultSelectedTab={defaultTabs.findIndex((tab) => tab.link === this.props.params.tab)} style={{ indicator: { backgroundColor: '#f6b2b5' } }} onChangeTab={this.handleTabs}>
              {this.mapTabs()}
            </TabGroup>
          </div>
        </div>
        <div className="card-body">
          {this.tabSwitch()}
        </div>
      </div>
    )
  }
}

DrugBody.propTypes = {
  drug: PropTypes.object,
  params: PropTypes.object,
}

export default DrugBody
