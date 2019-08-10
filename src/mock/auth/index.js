import Project from './project'
import Resource from './resource'
import Role from './role'
import User from './user'
import Region from './region'

export default {
    bootstrap (mock) {
        Project.bootstrap(mock)
        Resource.bootstrap(mock)
        Role.bootstrap(mock)
        User.bootstrap(mock)
        Region.bootstrap(mock)
    }
}