'use strict';

const pluginManager = require('@arkecosystem/core-plugin-manager')
const state = pluginManager.get('blockchain').getState()
const config = pluginManager.get('config')

/**
 * [description]
 * @param  {[type]} delegate [description]
 * @return {[type]}          [description]
 */
exports.calculateApproval = (delegate) => {
  const lastBlock = state.lastBlock.data
  const constants = config.getConstants(lastBlock.height)
  const totalSupply = config.genesisBlock.totalAmount + (lastBlock.height - constants.height) * constants.reward

  return ((delegate.balance / totalSupply) * 100).toFixed(2)
}

/**
 * [description]
 * @param  {[type]} delegate [description]
 * @return {[type]}          [description]
 */
exports.calculateProductivity = (delegate) => {
  if (!delegate.missedBlocks && !delegate.producedBlocks) {
    return (0).toFixed(2)
  }

  return (100 - (delegate.missedBlocks / ((delegate.producedBlocks + delegate.missedBlocks) / 100))).toFixed(2)
}