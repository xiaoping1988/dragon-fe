import Project from './project'
import Dashboard from './dashboard'
import Chart from './chart'
import Filter from './filter'

export default {
    bootstrap (mock) {
        Project.bootstrap(mock)
        Dashboard.bootstrap(mock)
        Chart.bootstrap(mock)
        Filter.bootstrap(mock)
    }
}