'use strict';

export const s_category = 'IF(category.id IS NULL,NULL,JSON_OBJECT(\'id\', category.id, \'name\', category.title)) as category';
export const s_user = '(SELECT JSON_OBJECT(\'id\', user.id, \'name\', user.\`name\`, \'avatar\', user.\`avatar\`) FROM \`user\` WHERE \`user\`.id = post.user_id) as user';
export const f_user = user_id => `(SELECT JSON_OBJECT(\'id\', user.id, \'name\', user.\`name\`, \'avatar\', user.\`avatar\`) FROM \`user\` WHERE \`user\`.id = ${user_id}) as user`;
export const s_list_post = 'post.id, post.title, post.description, visit_count, is_article, cover_pic, created_at, updated_at';
export const s_post_content = `${exports.s_list_post}, content`;
export const s_post_comment_count = '(SELECT COUNT(*) FROM `comment` WHERE comment.relation_id = post.id ) as comment_count';
export const s_post_tags = '(SELECT JSON_ARRAYAGG(tag_name) FROM tag_relation WHERE tag_relation.post_id = post.id) as tags';
