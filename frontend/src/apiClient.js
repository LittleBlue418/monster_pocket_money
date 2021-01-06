import axios from 'axios'


export class APIClient {
  constructor() {
    this.http = axios.create()
    this.baseUrl = 'http://localhost:3000'

    this.list_jobs = this.list_jobs.bind(this)
    this.create_job = this.create_job.bind(this)
    this.get_job = this.get_job.bind(this)
    this.update_job = this.update_job.bind(this)
    this.delete_job = this.delete_job.bind(this)

    this.list_jobinstances = this.list_jobinstances.bind(this)
    this.create_jobinstance = this.create_jobinstance.bind(this)
    this.get_jobinstance = this.get_jobinstance.bind(this)
    this.update_jobinstance = this.update_jobinstance.bind(this)
    this.delete_jobinstance = this.delete_jobinstance.bind(this)
    this.approve_jobinstance = this.approve_jobinstance.bind(this)

    this.list_profiles = this.list_profiles.bind(this)
    this.create_profile = this.create_profile.bind(this)
    this.get_profile = this.get_profile.bind(this)
    this.update_profile = this.update_profile.bind(this)
    this.delete_profile = this.delete_profile.bind(this)
  }

  //============================================================
  // Jobs
  //============================================================

  list_jobs() {
    return this.http.get(this.baseUrl + '/api/jobs').then(result => result.data.jobs)
  }

  create_job(job) {
    return this.http.post(this.baseUrl + '/api/jobs', job).then(result => result.data)
  }

  get_job(job_id) {
    return this.http.get(this.baseUrl + '/api/jobs/' + job_id).then(result => result.data)
  }

  update_job(job_id, job) {
    return this.http.put(this.baseUrl + '/api/jobs/' + job_id, job).then(result => result.data)
  }

  delete_job(job_id) {
    return this.http.delete(this.baseUrl + '/api/jobs/' + job_id).then(result => result.data)
  }


  //============================================================
  // Job Instances
  //============================================================

  list_jobinstances() {
    return this.http.get(this.baseUrl + '/api/jobinstances').then(result => result.data.jobinstances)
  }

  create_jobinstance(jobinstance) {
    return this.http.post(this.baseUrl + '/api/jobinstances', jobinstance).then(result => result.data)
  }

  get_jobinstance(jobinstance_id) {
    return this.http.get(this.baseUrl + '/api/jobinstances/' + jobinstance_id).then(result => result.data)
  }

  update_jobinstance(jobinstance_id, participant_ids) {
    return this.http.put(this.baseUrl + '/api/jobinstances/' + jobinstance_id, {"participant_ids": participant_ids}).then(result => result.data)
  }

  delete_jobinstance(jobinstance_id) {
    return this.http.delete(this.baseUrl + '/api/jobinstances/' + jobinstance_id).then(result => result.data)
  }

  approve_jobinstance(jobinstance_id) {
    return this.http.post(this.baseUrl + '/api/jobinstances/' + jobinstance_id + '/approve').then(result => result.data)
  }


  //============================================================
  // Profiles
  //============================================================

  list_profiles() {
    return this.http.get(this.baseUrl + '/api/profiles').then(result => result.data.profiles)
  }

  create_profile(profile) {
    return this.http.post(this.baseUrl + '/api/profiles', profile).then(result => result.data)
  }

  get_profile(profile_id) {
    return this.http.get(this.baseUrl + '/api/profiles/' + profile_id).then(result => result.data)
  }

  update_profile(profile_id, profile) {
    return this.http.put(this.baseUrl + '/api/profiles/' + profile_id, profile).then(result => result.data)
  }

  delete_profile(profile_id) {
    return this.http.delete(this.baseUrl + '/api/profiles/' + profile_id).then(result => result.data)
  }
}

export default APIClient