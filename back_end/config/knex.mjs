let {
  NODE_ENV, mysql_host, mysql_port, mysql_user, mysql_password, mysql_database
}  = process.env

import k from 'knex'

/**
 * @type {Knex}
 */
export const knex = k({
  client: 'mysql2',
  connection: {
    host: mysql_host,
    port: mysql_port,
    user: mysql_user,
    password: mysql_password,
    database: mysql_database,
  },
  debug: NODE_ENV !== 'production',
});

// 要注意不要覆盖源方法
// this会是实际的knex对象，如果使用当前对象，应该使用对象名_extends
const _extends = {
  selectRaw(selectString) {
    return this.select(knex.raw(selectString));
  },
  whereIf(condition, ...args) {
    return condition ? this.where(...args) : this;
  },
  // 接收一个where查询，返回一个Number
  async countValue() {
    const row = await this.count('* as count').first();
    return row.count;
  },
  async isExist() {
    return (await this.countValue()) >= 1;
  },
  async returnAutoIncrementId(knexInsert) {
    return (await knexInsert)[0];
  },
};
// knex 是一个函数，返回的是QueryBuilder
// knex.queryBuilder().__proto__  在原型上添加方法
for (const key in _extends) {
  // eslint-disable-next-line no-proto
  knex.queryBuilder().__proto__[key] = _extends[key];
  knex[key] = _extends[key];
}
