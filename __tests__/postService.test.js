const postService = require('../service/postService');
const postDAO = require('../repository/postDAO');

jest.mock('../repository/postDAO')

describe('Post Service', () => {
    test('Should create a post item', async () => {
        // Arrange Post Data
        const post = {
            user_id: '410efa6b-fe19-427c-88ee-83c4cf485cd7',
            body: "test",
            mbid: "f5093c06-23e3-404f-aeaa-40f72885ee3a" // Pink Floyd - The Dark Side of the Moon
        }

        const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i //Regex for UUID
        
        postDAO.addPost.mockResolvedValue();
        const result = await postService.addPost(post.user_id, post.body, post.mbid)

        expect.assertions(1)
        //TODO: addPost should be called with a post id that is unknown at the time of the function call, but should be present as a v4 uuid.
        expect(postDAO.addPost).toHaveBeenCalledWith(post.user_id, expect.stringMatching(regex), post.body, post.mbid)
    })
})