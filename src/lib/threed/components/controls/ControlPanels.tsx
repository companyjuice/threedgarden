// 'use client'
// ==========================================================
// RESOURCES

// ** REACT Imports
import {
  useEffect,
  useRef,
  useState,
  // useCallback,
  ReactNode,
  FC,
  Suspense,
  PointerEventHandler,
  SyntheticEvent,
} from 'react'
import { useFrame, useThree } from '@react-three/fiber'
// import Cubes from './Cubes'
// ** APOLLO Imports
import { useReactiveVar, useApolloClient } from '@apollo/client'
import { preferencesDataVar } from '#/lib/stores/apollo'
// import { stores, queries, mutations } from '#/lib/stores/apollo'
import stores from '#/lib/stores/apollo'

// ** Leva GUI
// import { ThreeDLevaControls, ThreeDLevaComponent } from '#/lib/threed/components/controls/LevaControls'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiButton from '@mui/material/Button'
import MuiTabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import MDTabPanel, { tabProps } from '#/lib/mui/MDTabPanel'
import Typography from '@mui/material/Typography'

// ** HELPER Imports
import { Perf, PerfHeadless, usePerf } from 'r3f-perf'
import Spinner from '#/layout/ui/components/spinner'
// ** HELPFUL UTIL: COLORFUL CONSOLE MESSAGES (ccm)
import ccm from '#/lib/utils/console-colors'


// ==========================================================
// Debugging (Perf: Monitor Reports)
// https://codesandbox.io/p/sandbox/perlin-cubes-r3f-perf-headless-forked-zq734s
// **
const DebugHeadless = () => {

  // @ts-expect-error
  const [log, getReport] = usePerf((s) => [s.log, s.getReport])
  // console.log(getReport())

  return (
    <div>
      <div><b>LOG Realtime:</b></div>
      <code>
        {log &&
          Object.entries(log).map(([key, val]) => (
            <div key={key}>
              {/* @ts-expect-error */}
              {key}: {parseFloat(val).toFixed(3)}
            </div>
          ))}
      </code>
      <br/>
      <div><b>REPORT: Data gathered for {parseFloat(getReport().sessionTime).toFixed(2)}s</b></div>
      <code>
        averages:
        {Object.entries(getReport().log).map(([key, val]) => (
          <div key={key}>
            {/* @ts-expect-error */}
            {key}: {parseFloat(val).toFixed(3)}
          </div>
        ))}
      </code>
    </div>
  )
}
const Debug = () => {
  const { width } = useThree((s) => s.size)
  return (
    /* This is it -> */
    <PerfHeadless 
      // logsPerSecond?: 10, // Refresh rate of the logs
      // antialias?: true, // Take a bit more performances but render the text with antialiasing
      // overClock?: false, // Disable the limitation of the monitor refresh rate for the fps
      // deepAnalyze?: false, // More detailed informations about gl programs
      // showGraph?: true // show the graphs
      // minimal?: false // condensed version with the most important informations (gpu/memory/fps/custom data)
      // customData?: {
      //   value: 0, // initial value,
      //   name: '', // name to show
      //   round: 2, // precision of the float
      //   info: '', // additional information about the data (fps/ms for instance)
      // }
      // matrixUpdate?: false // count the number of time matrixWorldUpdate is called per frame
      // chart?: {
      //   hz: 60, // graphs refresh frequency parameter
      //   length: 120, // number of values shown on the monitor
      // }
      // colorBlind?: false // Color blind colors for accessibility
      // className?: '' // override CSS class
      // style?: {} // override style
      // position?: 'top-right'|'top-left'|'bottom-right'|'bottom-left' // quickly set the position, default is top-right
      minimal={width < 712} 
      showGraph={false} // show the graphs
      // logsPerSecond={1} // Refresh rate of the logs
      // chart={{
      //   hz: 1, // graphs refresh frequency parameter
      //   length: 12, // number of values shown on the monitor
      // }}
    />
  )
}

// const Controls = () => {
//   const { camera, gl, invalidate } = useThree()
//   const ref = useRef()
//   useFrame(() => ref.current.update())
//   useEffect(() => void ref.current.addEventListener('change', invalidate), [])
//   return <orbitControls ref={ref} enableDamping args={[camera, gl.domElement]} />
// }

function App() {
  // const control = useRef()

  return (
    <>
      <DebugHeadless />
      {/* <Canvas
        linear={false}
        concurrent
        shadowMap
        orthographic
        pixelRatio={[1, 2]}
        camera={{ position: [0, 0, 10], near: 1, far: 15, zoom: 50 }}>
        <Controls ref={control} />
        <ambientLight />
        <directionalLight />
        <Suspense fallback={null}>
          <Cubes position={[0, 0, 0]} rotation={[0, 0, Math.PI]} />
          <Debug />
        </Suspense>
      </Canvas> */}
    </>
  )
}


// ==========================================================

const Tabs = styled(MuiTabs)(({ theme }) => ({
  overflow: `scroll !important`,
}))

const Button = styled(MuiButton)(({ theme }) => ({
  marginRight: `0.25rem !important`,
  padding: `0.5rem 0.5rem !important`,
  minWidth: `2.0rem !important`,
}))

// ==========================================================
// FUNCTIONAL STORES
// ==========================================================

const {
  // nounStore,
  projectStore,
  participantStore,
  preferencesStore,
  planStore,
  threedStore,
  fileStore,
  sceneStore,
  allotmentStore,
  bedStore,
  plantStore,
  plantingPlanStore,
  // bearStore,
  // modalStore,
  // modalAboutStore,
  // modalModel3dStore,
  // modalLoadingStore,
  // modalShareStore,
  // modalStoreNoun,
} = stores
// console.debug('%cstores available', ccm.orange, stores)
// console.debug(`%c====================================`, ccm.black)

// **
export const ThreeDControlPanels = (
  { projectName,
    setProjectName
  }: {
    projectName: string,
    setProjectName: Function
  }
): ReactNode => {

  // ==========================================================
  // Tabs
  //
  const [tabControlValue, setTabControlValue] = useState(0)
  const onChangeTabControlValue = (event: SyntheticEvent, newValue: number) => {
    setTabControlValue(newValue)
    localStorage.setItem('threed_tabControlValue', newValue.toString())
  }

  // ==========================================================
  // Component onMount hook
  //
  useEffect(() => {
    // **
    // set open tab
    const openTab: number = Number(localStorage.getItem('threed_tabControlValue'))
    setTabControlValue(openTab ? openTab : 0)

    // ==========================================================
    // return () => {
    //   console.debug('ThreeDGarden onUnmount', word)
    // }
  }, [])

  // **
  return (
    <Box id='storeControlPanel'>
      <Box sx={{ borderTop: 1, borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabControlValue}
          onChange={onChangeTabControlValue}
          aria-label='ThreeD Control Panel'
        >
          <Tab label='Preferences' {...tabProps(0)} />
          <Tab label='Projects' {...tabProps(1)} />
          <Tab label='Plans' {...tabProps(2)} />
          <Tab label='ThreeDs' {...tabProps(3)} />
          <Tab label='Files' {...tabProps(4)} />
          <Tab label='Scenes' {...tabProps(5)} />
          <Tab label='Allotments' {...tabProps(6)} />
          <Tab label='Beds' {...tabProps(7)} />
          <Tab label='Plants' {...tabProps(8)} />
          <Tab label='Schedules' {...tabProps(9)} />
          <Tab label='Tests' {...tabProps(10)} />
        </Tabs>
      </Box>
      <Box sx={{ p: 2, borderTop: 1, borderBottom: 1, borderColor: 'divider' }}>
        <MDTabPanel value={tabControlValue} index={0}>
          <PreferencesControlPanel />
          <PreferencesInfoPanel />
        </MDTabPanel>
        <MDTabPanel value={tabControlValue} index={1}>
          <ProjectControlPanel />
          <ProjectInfoPanel />
        </MDTabPanel>
        <MDTabPanel value={tabControlValue} index={2}>
          <PlanControlPanel />
          <PlanInfoPanel />
        </MDTabPanel>
        <MDTabPanel value={tabControlValue} index={3}>
          <ThreeDControlPanel />
          <ThreeDInfoPanel />
        </MDTabPanel>
        <MDTabPanel value={tabControlValue} index={4}>
          <FileControlPanel />
          <FileInfoPanel />
        </MDTabPanel>
        <MDTabPanel value={tabControlValue} index={5}>
          <SceneControlPanel />
          <SceneInfoPanel />
        </MDTabPanel>
        <MDTabPanel value={tabControlValue} index={6}>
          <AllotmentControlPanel />
          <AllotmentInfoPanel />
        </MDTabPanel>
        <MDTabPanel value={tabControlValue} index={7}>
          <BedControlPanel />
          <BedInfoPanel />
        </MDTabPanel>
        <MDTabPanel value={tabControlValue} index={8}>
          <PlantControlPanel />
          <PlantInfoPanel />
        </MDTabPanel>
        <MDTabPanel value={tabControlValue} index={9}>
          <PlantingPlanControlPanel />
          <PlantingPlanInfoPanel />
        </MDTabPanel>
        <MDTabPanel value={tabControlValue} index={10}>
          <Box sx={{ p: 2}}>
            <Box>
              Testing Panel
            </Box>
            {/* <Box sx={{ p: 2}}>
              <ThreeDLevaComponent projectName={projectName} setProjectName={setProjectName} />
              <input type='button' onClick={(e) => setProjectName('TEST')} value='TEST' />
              <input type='button' onClick={(e) => setProjectName('PROJECT MMMM')} value='DEFAULT' />
            </Box> */}
            <Box>
              {/* <CharacterControlPanel /> */}
              {/* <CharacterInfoPanel /> */}
              {/* <hr /> */}
              {/* <FurnitureControlPanel /> */}
              {/* <FurnitureInfoPanel /> */}
              {/* <hr /> */}
              {/* <ChickenControlPanel /> */}
              {/* <ChickenInfoPanel /> */}
              {/* <hr /> */}
              {/* <BearControlPanel /> */}
              {/* <BearInfoPanel /> */}
              {/* <hr /> */}
            </Box>
            <Box>
              <App />
            </Box>
          </Box>
        </MDTabPanel>
      </Box>
    </Box>
  )
}

// ==========================================================
// Preferences

const PreferencesInfoPanel = (): JSX.Element => {
  // **
  const prefs = useReactiveVar(preferencesDataVar)
  // **
  const preferencesCount = preferencesStore.store.useStore('count')
  const preferencess = preferencesStore.store.useStore('all')
  const preferences = preferencesStore.store.useStore('one')
  // console.debug('preferences info panel ##', preferencesCount)
  // console.debug('preferences info panel []', preferencess)
  // console.debug('preferences info panel {}', preferences)
  // const preferencessDB = preferencesStore.store.useStore('allDB')
  // const preferencesDB = preferencesStore.store.useStore('oneDB')

  return (
    <Box sx={{ px: 2 }}>
      <Typography><strong>prefs.projectName: {prefs.projectName}</strong></Typography>
      <Typography>preferences[s].length: {preferencess.length} | count: {preferencesCount}</Typography>
      { preferences?._id && (
        <Typography>preferences._id: {preferences._id}</Typography>
      )}
        {/* <Typography>preferences._ts: {preferences._ts}</Typography> */}
        <Typography>preferences._name: {preferences._name}</Typography>
        <Typography>preferences.data.title: {preferences.data.title}</Typography>
        <Typography>preferences.data.doAutoLoadData: {preferences.data?.doAutoLoadData?.toString()}</Typography>
        <Typography>preferences.data.doAutoRotate: {preferences.data?.doAutoRotate?.toString()}</Typography>
        <Typography>preferences.data.projectName: {preferences.data?.projectName?.toString()}</Typography>
    </Box>
  )
}

const PreferencesControlPanel = (): JSX.Element => {

  const client = useApolloClient()

  const addNew = () => preferencesStore.actions.addNew()
  const saveToDisk = () => preferencesStore.actions.saveToDisk()
  const loadFromDisk = () => preferencesStore.actions.loadFromDisk()
  const loadFromDB = () => preferencesStore.actions.loadFromDB(client)
  const saveToDB = () => preferencesStore.actions.saveToDB(client)
  const removeAll = () => preferencesStore.actions.removeAll()
  const increaseCount = () => preferencesStore.store.update('count', preferencesStore.actions.increaseCount())
  const decreaseCount = () => preferencesStore.store.update('count', preferencesStore.actions.decreaseCount())
  const getState = () => preferencesStore.actions.getState()

  return (
    <Box>
      <Button onClick={loadFromDB} style={{color: 'orange'}}>load from db</Button>
      <Button onClick={saveToDB}>save to db</Button>
      <Button onClick={loadFromDisk} style={{color: 'orange'}}>load from disk</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={addNew}>add new</Button>
      <Button onClick={removeAll} style={{color: 'darkred'}}>remove all</Button>
      {/* <Button onClick={increaseCount}>+</Button> */}
      {/* <Button onClick={decreaseCount}>-</Button> */}
      <Button onClick={getState}>get state</Button>
    </Box>
  )
}

// ==========================================================
// Project

const ProjectInfoPanel = (): JSX.Element => {
  // **
  const prefs = useReactiveVar(preferencesDataVar)
  // **
  const projectCount = projectStore.store.useStore('count')
  const projects = projectStore.store.useStore('all')
  const project = projectStore.store.useStore('one')
  // const projectsDB = projectStore.store.useStore('allDB')
  // const projectDB = projectStore.store.useStore('oneDB')
  let projectName = project._name
      projectName = project.data?.title
      projectName = prefs.projectName

  return (
    <Box sx={{ px: 2 }}>
      <Typography><strong>prefs.projectName: {projectName}</strong></Typography>
      <Typography>projects.length: {projects.length} | count: {projectCount}</Typography>
      {/* <Typography>projectsDB: {projectsDB.length}</Typography> */}
      <Typography>project._id: {project._id}</Typography>
      {/* <Typography>project._ts: {project._ts}</Typography> */}
      <Typography>project._name: {project._name}</Typography>
      <Typography>project.data.title: {project.data?.title}</Typography>
      <Typography>project.data.scene[s]: {project.data?.scenes?.nodes[0].title}</Typography>
      <Typography>project.data.plan[s]: {project.data?.plans?.nodes[0].title}</Typography>
    </Box>
  )
}

const ProjectControlPanel = (): JSX.Element => {

  const client = useApolloClient()

  const addNew = () => projectStore.actions.addNew()
  const saveToDisk = () => projectStore.actions.saveToDisk()
  const loadFromDisk = () => projectStore.actions.loadFromDisk()
  const loadFromDB = () => projectStore.actions.loadFromDB(client)
  const saveToDB = () => projectStore.actions.saveToDB(client)
  const removeAll = () => projectStore.actions.removeAll()
  const increaseCount = () => projectStore.store.update('count', projectStore.actions.increaseCount())
  const decreaseCount = () => projectStore.store.update('count', projectStore.actions.decreaseCount())
  const getState = () => projectStore.actions.getState()
  // **
  const loadToCanvas = () => {

    // LOAD APOLLO STORE STATE TO VALTIO STATE ????

    let nodesToCreateOnCanvas = []
    nodesToCreateOnCanvas = projectStore.actions.loadToCanvas(
      client,
      // [],
      projectStore.store.get('one').data.plans.nodes[0].threedsActive.nodes, // plans[] of threeds[]
      'project', // _type
      'plansOfThreeDNodes', // _requestType
      '3333', // _id
      '_r3fCanvas' // _r3fCanvas id to write changes to
    )

    return (
      nodesToCreateOnCanvas
    )
  }

  return (
    <Box>
      <Button onClick={loadFromDB} style={{color: 'orange'}}>load from db</Button>
      <Button onClick={saveToDB}>save to db</Button>
      <Button onClick={loadFromDisk} style={{color: 'orange'}}>load from disk</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={addNew}>add new</Button>
      <Button onClick={removeAll} style={{color: 'darkred'}}>remove all</Button>
      {/* <Button onClick={increaseCount}>+</Button> */}
      {/* <Button onClick={decreaseCount}>-</Button> */}
      <Button onClick={getState}>get state</Button>
      <Button onClick={loadToCanvas} style={{color: 'blue'}}>load to canvas</Button>
    </Box>
  )
}

// ==========================================================
// Participant

const ParticipantInfoPanel = (): JSX.Element => {
  const participantCount = participantStore.store.useStore('count')
  const participants = participantStore.store.useStore('all')
  const participant = participantStore.store.useStore('one')
  // const participantsDB = participantStore.store.useStore('allDB')
  // const participantDB = participantStore.store.useStore('oneDB')

  return (
    <Box sx={{ px: 2 }}>
      <Typography>{participantCount} participants around here ...</Typography>
      <Typography>participants: {participants.length}</Typography>
      {/* <Typography>participantsDB: {participantsDB.length}</Typography> */}
      <Typography>participant._id: {participant._id}</Typography>
      <Typography>participant._ts: {participant._ts}</Typography>
      <Typography>participant._name: {participant._name}</Typography>
      <Typography>participant.data.title: {participant.data?.title}</Typography>
    </Box>
  )
}

const ParticipantControlPanel = (): JSX.Element => {

  const client = useApolloClient()

  const addNew = () => participantStore.actions.addNew()
  const saveToDisk = () => participantStore.actions.saveToDisk()
  const loadFromDisk = () => participantStore.actions.loadFromDisk()
  const loadFromDB = () => participantStore.actions.loadFromDB(client)
  const saveToDB = () => participantStore.actions.saveToDB(client)
  const removeAll = () => participantStore.actions.removeAll()
  const increaseCount = () => participantStore.store.update('count', participantStore.actions.increaseCount())
  const decreaseCount = () => participantStore.store.update('count', participantStore.actions.decreaseCount())
  const getState = () => participantStore.actions.getState()
  const loadToCanvas = () => participantStore.actions.loadToCanvas()

  return (
    <Box>
      <Button onClick={loadFromDB} style={{color: 'orange'}}>load from db</Button>
      <Button onClick={saveToDB}>save to db</Button>
      <Button onClick={loadFromDisk} style={{color: 'orange'}}>load from disk</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={addNew}>add new</Button>
      <Button onClick={removeAll} style={{color: 'darkred'}}>remove all</Button>
      {/* <Button onClick={increaseCount}>+</Button> */}
      {/* <Button onClick={decreaseCount}>-</Button> */}
      {/*  */}
      <Button onClick={getState}>get state</Button>
      <Button onClick={loadToCanvas} style={{color: 'blue'}}>load to canvas</Button>
    </Box>
  )
}

// ==========================================================
// Plan

const PlanInfoPanel = (): JSX.Element => {
  const planCount = planStore.store.useStore('count')
  const plans = planStore.store.useStore('all')
  const plan = planStore.store.useStore('one')
  // const plansDB = planStore.store.useStore('allDB')
  // const planDB = planStore.store.useStore('oneDB')

  return (
    <Box sx={{ px: 2 }}>
      <Typography>{planCount} plans around here ...</Typography>
      <Typography>plans: {plans.length}</Typography>
      {/* <Typography>plansDB: {plansDB.length}</Typography> */}
      <Typography>plan._id: {plan._id}</Typography>
      <Typography>plan._ts: {plan._ts}</Typography>
      <Typography>plan._name: {plan._name}</Typography>
      <Typography>plan.data.title: {plan.data?.title}</Typography>
    </Box>
  )
}

const PlanControlPanel = (): JSX.Element => {

  const client = useApolloClient()

  const addNew = () => planStore.actions.addNew()
  const saveToDisk = () => planStore.actions.saveToDisk()
  const loadFromDisk = () => planStore.actions.loadFromDisk()
  const loadFromDB = () => planStore.actions.loadFromDB(client)
  const saveToDB = () => planStore.actions.saveToDB(client)
  const removeAll = () => planStore.actions.removeAll()
  const increaseCount = () => planStore.store.update('count', planStore.actions.increaseCount())
  const decreaseCount = () => planStore.store.update('count', planStore.actions.decreaseCount())
  const getState = () => planStore.actions.getState()
  const loadToCanvas = () => planStore.actions.loadToCanvas()

  return (
    <Box>
      <Button onClick={loadFromDB} style={{color: 'orange'}}>load from db</Button>
      <Button onClick={saveToDB}>save to db</Button>
      <Button onClick={loadFromDisk} style={{color: 'orange'}}>load from disk</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={addNew}>add new</Button>
      <Button onClick={removeAll} style={{color: 'darkred'}}>remove all</Button>
      {/* <Button onClick={increaseCount}>+</Button> */}
      {/* <Button onClick={decreaseCount}>-</Button> */}
      {/*  */}
      <Button onClick={getState}>get state</Button>
      <Button onClick={loadToCanvas} style={{color: 'blue'}}>load to canvas</Button>
    </Box>
  )
}

// ==========================================================
// ThreeD

const ThreeDInfoPanel = (): JSX.Element => {
  const threedCount = threedStore.store.useStore('count')
  const threeds = threedStore.store.useStore('all')
  const threed = threedStore.store.useStore('one')
  // const threedsDB = threedStore.store.useStore('allDB')
  // const threedDB = threedStore.store.useStore('oneDB')

  return (
    <Box sx={{ px: 2 }}>
      <Typography>{threedCount} threeds around here ...</Typography>
      <Typography>threeds: {threeds.length}</Typography>
      {/* <Typography>threedsDB: {threedsDB.length}</Typography> */}
      <Typography>threed._id: {threed._id}</Typography>
      <Typography>threed._ts: {threed._ts}</Typography>
      <Typography>threed._name: {threed._name}</Typography>
      <Typography>threed.data.title: {threed.data?.title}</Typography>
    </Box>
  )
}

const ThreeDControlPanel = (): JSX.Element => {

  const client = useApolloClient()

  const addNew = () => threedStore.actions.addNew()
  const saveToDisk = () => threedStore.actions.saveToDisk()
  const loadFromDisk = () => threedStore.actions.loadFromDisk()
  const loadFromDB = () => threedStore.actions.loadFromDB(client)
  const saveToDB = () => threedStore.actions.saveToDB(client)
  const removeAll = () => threedStore.actions.removeAll()
  const increaseCount = () => threedStore.store.update('count', threedStore.actions.increaseCount())
  const decreaseCount = () => threedStore.store.update('count', threedStore.actions.decreaseCount())
  const getState = () => threedStore.actions.getState()
  const loadToCanvas = () => threedStore.actions.loadToCanvas()

  return (
    <Box>
      <Button onClick={loadFromDB} style={{color: 'orange'}}>load from db</Button>
      <Button onClick={saveToDB}>save to db</Button>
      <Button onClick={loadFromDisk} style={{color: 'orange'}}>load from disk</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={addNew}>add new</Button>
      <Button onClick={removeAll} style={{color: 'darkred'}}>remove all</Button>
      {/* <Button onClick={increaseCount}>+</Button> */}
      {/* <Button onClick={decreaseCount}>-</Button> */}
      {/*  */}
      <Button onClick={getState}>get state</Button>
      <Button onClick={loadToCanvas} style={{color: 'blue'}}>load to canvas</Button>
    </Box>
  )
}

// ==========================================================
// File

const FileInfoPanel = (): JSX.Element => {
  const fileCount = fileStore.store.useStore('count')
  const files = fileStore.store.useStore('all')
  const file = fileStore.store.useStore('one')
  // const filesDB = fileStore.store.useStore('allDB')
  // const fileDB = fileStore.store.useStore('oneDB')

  return (
    <Box sx={{ px: 2 }}>
      <Typography>{fileCount} files around here ...</Typography>
      <Typography>files: {files.length}</Typography>
      {/* <Typography>filesDB: {filesDB.length}</Typography> */}
      <Typography>file._id: {file._id}</Typography>
      <Typography>file._ts: {file._ts}</Typography>
      <Typography>file._name: {file._name}</Typography>
      <Typography>file.data.title: {file.data?.title}</Typography>
    </Box>
  )
}

const FileControlPanel = (): JSX.Element => {

  const client = useApolloClient()

  const addNew = () => fileStore.actions.addNew()
  const saveToDisk = () => fileStore.actions.saveToDisk()
  const loadFromDisk = () => fileStore.actions.loadFromDisk()
  const loadFromDB = () => fileStore.actions.loadFromDB(client)
  const saveToDB = () => fileStore.actions.saveToDB(client)
  const removeAll = () => fileStore.actions.removeAll()
  const increaseCount = () => fileStore.store.update('count', fileStore.actions.increaseCount())
  const decreaseCount = () => fileStore.store.update('count', fileStore.actions.decreaseCount())
  const getState = () => fileStore.actions.getState()
  const loadToCanvas = () => fileStore.actions.loadToCanvas()

  return (
    <Box>
      <Button onClick={loadFromDB} style={{color: 'orange'}}>load from db</Button>
      <Button onClick={saveToDB}>save to db</Button>
      <Button onClick={loadFromDisk} style={{color: 'orange'}}>load from disk</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={addNew}>add new</Button>
      <Button onClick={removeAll} style={{color: 'darkred'}}>remove all</Button>
      {/* <Button onClick={increaseCount}>+</Button> */}
      {/* <Button onClick={decreaseCount}>-</Button> */}
      {/*  */}
      <Button onClick={getState}>get state</Button>
      <Button onClick={loadToCanvas} style={{color: 'blue'}}>load to canvas</Button>
    </Box>
  )
}

// ==========================================================
// Simulation

// ==========================================================
// Scene

const SceneInfoPanel = (): JSX.Element => {
  const sceneCount = sceneStore.store.useStore('count')
  // const sceneCountDB = sceneStore.store.useStore('countDB')
  const scenes = sceneStore.store.useStore('all')
  const scene = sceneStore.store.useStore('one')
  // const scenesDB = sceneStore.store.useStore('allDB')
  // const sceneDB = sceneStore.store.useStore('oneDB')

  return (
    <Box sx={{ px: 2 }}>
      <Typography>all.length: {scenes.length}</Typography>
      <Typography>one._id: {scene._id}</Typography>
      <Typography>one._ts: {scene._ts}</Typography>
      <Typography>one._name: {scene._name}</Typography>
      <Typography>one.data.title: {scene.data?.title}</Typography>
    </Box>
  )
}

const SceneControlPanel = (): JSX.Element => {

  const client = useApolloClient()

  const addNew = () => sceneStore.actions.addNew()
  const saveToDisk = () => sceneStore.actions.saveToDisk()
  const loadFromDisk = () => sceneStore.actions.loadFromDisk()
  const loadFromDB = () => sceneStore.actions.loadFromDB(client)
  const saveToDB = () => sceneStore.actions.saveToDB(client)
  const removeAll = () => sceneStore.actions.removeAll()
  const increaseCount = () => sceneStore.store.update('count', sceneStore.actions.increaseCount())
  const decreaseCount = () => sceneStore.store.update('count', sceneStore.actions.decreaseCount())
  const getState = () => sceneStore.actions.getState()
  const loadToCanvas = () => sceneStore.actions.loadToCanvas()

  return (
    <Box>
      <Button onClick={loadFromDB}>load from db</Button>
      <Button onClick={saveToDB}>save to db</Button>
      <Button onClick={loadFromDisk}>load from disk</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={addNew}>add new</Button>
      <Button onClick={removeAll}>remove all</Button>
      {/* <Button onClick={increaseCount}>+</Button> */}
      {/* <Button onClick={decreaseCount}>-</Button> */}
      {/*  */}
      <Button onClick={getState}>get state</Button>
      <Button onClick={loadToCanvas}>load to canvas</Button>
    </Box>
  )
}

// ==========================================================
// Allotment

const AllotmentInfoPanel = (): JSX.Element => {
  const allotmentCount = allotmentStore.store.useStore('count')
  const allotments = allotmentStore.store.useStore('all')
  const allotment = allotmentStore.store.useStore('one')
  // const allotmentsDB = allotmentStore.store.useStore('allDB')
  // const allotmentDB = allotmentStore.store.useStore('oneDB')

  return (
    <Box sx={{ px: 2 }}>
      <Typography>{allotmentCount} allotments around here ...</Typography>
      <Typography>allotments: {allotments.length}</Typography>
      {/* <Typography>allotmentsDB: {allotmentsDB.length}</Typography> */}
      <Typography>allotment._id: {allotment._id}</Typography>
      <Typography>allotment._ts: {allotment._ts}</Typography>
      <Typography>allotment._name: {allotment._name}</Typography>
      <Typography>allotment.data.title: {allotment.data?.title}</Typography>
    </Box>
  )
}

const AllotmentControlPanel = (): JSX.Element => {

  const client = useApolloClient()

  const addNew = () => allotmentStore.actions.addNew()
  const saveToDisk = () => allotmentStore.actions.saveToDisk()
  const loadFromDisk = () => allotmentStore.actions.loadFromDisk()
  const loadFromDB = () => allotmentStore.actions.loadFromDB(client)
  const saveToDB = () => allotmentStore.actions.saveToDB(client)
  const removeAll = () => allotmentStore.actions.removeAll()
  const increaseCount = () => allotmentStore.store.update('count', allotmentStore.actions.increaseCount())
  const decreaseCount = () => allotmentStore.store.update('count', allotmentStore.actions.decreaseCount())
  const getState = () => allotmentStore.actions.getState()
  const loadToCanvas = () => allotmentStore.actions.loadToCanvas()

  return (
    <Box>
      <Button onClick={loadFromDB} style={{color: 'orange'}}>load from db</Button>
      <Button onClick={saveToDB}>save to db</Button>
      <Button onClick={loadFromDisk} style={{color: 'orange'}}>load from disk</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={addNew}>add new</Button>
      <Button onClick={removeAll} style={{color: 'darkred'}}>remove all</Button>
      {/* <Button onClick={increaseCount}>+</Button> */}
      {/* <Button onClick={decreaseCount}>-</Button> */}
      {/*  */}
      <Button onClick={getState}>get state</Button>
      <Button onClick={loadToCanvas} style={{color: 'blue'}}>load to canvas</Button>
    </Box>
  )
}

// ==========================================================
// Bed

const BedInfoPanel = (): JSX.Element => {
  const bedCount = bedStore.store.useStore('count')
  const beds = bedStore.store.useStore('all')
  const bed = bedStore.store.useStore('one')
  // const bedsDB = bedStore.store.useStore('allDB')
  // const bedDB = bedStore.store.useStore('oneDB')

  return (
    <Box sx={{ px: 2 }}>
      <Typography>{bedCount} beds around here ...</Typography>
      <Typography>beds: {beds.length}</Typography>
      {/* <Typography>bedsDB: {bedsDB.length}</Typography> */}
      <Typography>bed._id: {bed._id}</Typography>
      <Typography>bed._ts: {bed._ts}</Typography>
      <Typography>bed._name: {bed._name}</Typography>
      <Typography>bed.data.title: {bed.data?.title}</Typography>
    </Box>
  )
}

const BedControlPanel = (): JSX.Element => {

  const client = useApolloClient()

  const addNew = () => bedStore.actions.addNew()
  const saveToDisk = () => bedStore.actions.saveToDisk()
  const loadFromDisk = () => bedStore.actions.loadFromDisk()
  const loadFromDB = () => bedStore.actions.loadFromDB(client)
  const saveToDB = () => bedStore.actions.saveToDB(client)
  const removeAll = () => bedStore.actions.removeAll()
  const increaseCount = () => bedStore.store.update('count', bedStore.actions.increaseCount())
  const decreaseCount = () => bedStore.store.update('count', bedStore.actions.decreaseCount())
  const getState = () => bedStore.actions.getState()
  const loadToCanvas = () => bedStore.actions.loadToCanvas()

  return (
    <Box>
      <Button onClick={loadFromDB} style={{color: 'orange'}}>load from db</Button>
      <Button onClick={saveToDB}>save to db</Button>
      <Button onClick={loadFromDisk} style={{color: 'orange'}}>load from disk</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={addNew}>add new</Button>
      <Button onClick={removeAll} style={{color: 'darkred'}}>remove all</Button>
      {/* <Button onClick={increaseCount}>+</Button> */}
      {/* <Button onClick={decreaseCount}>-</Button> */}
      {/*  */}
      <Button onClick={getState}>get state</Button>
      <Button onClick={loadToCanvas} style={{color: 'blue'}}>load to canvas</Button>
    </Box>
  )
}

// ==========================================================
// Plant

const PlantInfoPanel = (): JSX.Element => {
  const plantCount = plantStore.store.useStore('count')
  const plants = plantStore.store.useStore('all')
  const plant = plantStore.store.useStore('one')
  // const plantsDB = plantStore.store.useStore('allDB')
  // const plantDB = plantStore.store.useStore('oneDB')

  return (
    <Box sx={{ px: 2 }}>
      <Typography>{plantCount} plants around here ...</Typography>
      <Typography>plants: {plants.length}</Typography>
      {/* <Typography>plantsDB: {plantsDB.length}</Typography> */}
      <Typography>plant._id: {plant._id}</Typography>
      <Typography>plant._ts: {plant._ts}</Typography>
      <Typography>plant._name: {plant._name}</Typography>
      <Typography>plant.data.title: {plant.data?.title}</Typography>
    </Box>
  )
}

const PlantControlPanel = (): JSX.Element => {

  const client = useApolloClient()

  const addNew = () => plantStore.actions.addNew()
  const saveToDisk = () => plantStore.actions.saveToDisk()
  const loadFromDisk = () => plantStore.actions.loadFromDisk()
  const loadFromDB = () => plantStore.actions.loadFromDB(client)
  const saveToDB = () => plantStore.actions.saveToDB(client)
  const removeAll = () => plantStore.actions.removeAll()
  const increaseCount = () => plantStore.store.update('count', plantStore.actions.increaseCount())
  const decreaseCount = () => plantStore.store.update('count', plantStore.actions.decreaseCount())
  const getState = () => plantStore.actions.getState()
  const loadToCanvas = () => plantStore.actions.loadToCanvas()

  return (
    <Box>
      <Button onClick={loadFromDB} style={{color: 'orange'}}>load from db</Button>
      <Button onClick={saveToDB}>save to db</Button>
      <Button onClick={loadFromDisk} style={{color: 'orange'}}>load from disk</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={addNew}>add new</Button>
      <Button onClick={removeAll} style={{color: 'darkred'}}>remove all</Button>
      {/* <Button onClick={increaseCount}>+</Button> */}
      {/* <Button onClick={decreaseCount}>-</Button> */}
      {/*  */}
      <Button onClick={getState}>get state</Button>
      <Button onClick={loadToCanvas} style={{color: 'blue'}}>load to canvas</Button>
    </Box>
  )
}

// ==========================================================
// PlantingPlan

const PlantingPlanInfoPanel = (): JSX.Element => {
  const plantingPlanCount = plantingPlanStore.store.useStore('count')
  const plantingPlans = plantingPlanStore.store.useStore('all')
  const plantingPlan = plantingPlanStore.store.useStore('one')
  // const plantingPlansDB = plantingPlanStore.store.useStore('allDB')
  // const plantingPlanDB = plantingPlanStore.store.useStore('oneDB')

  return (
    <Box sx={{ px: 2 }}>
      <Typography>{plantingPlanCount} plantingPlans around here ...</Typography>
      <Typography>plantingPlans: {plantingPlans.length}</Typography>
      {/* <Typography>plantingPlansDB: {plantingPlansDB.length}</Typography> */}
      <Typography>plantingPlan._id: {plantingPlan._id}</Typography>
      <Typography>plantingPlan._ts: {plantingPlan._ts}</Typography>
      <Typography>plantingPlan._name: {plantingPlan._name}</Typography>
      <Typography>plantingPlan.data.title: {plantingPlan.data?.title}</Typography>
    </Box>
  )
}

const PlantingPlanControlPanel = (): JSX.Element => {

  const client = useApolloClient()

  const addNew = () => plantingPlanStore.actions.addNew()
  const saveToDisk = () => plantingPlanStore.actions.saveToDisk()
  const loadFromDisk = () => plantingPlanStore.actions.loadFromDisk()
  const loadFromDB = () => plantingPlanStore.actions.loadFromDB(client)
  const saveToDB = () => plantingPlanStore.actions.saveToDB(client)
  const removeAll = () => plantingPlanStore.actions.removeAll()
  const increaseCount = () => plantingPlanStore.store.update('count', plantingPlanStore.actions.increaseCount())
  const decreaseCount = () => plantingPlanStore.store.update('count', plantingPlanStore.actions.decreaseCount())
  const getState = () => plantingPlanStore.actions.getState()
  const loadToCanvas = () => plantingPlanStore.actions.loadToCanvas()

  return (
    <Box>
      <Button onClick={loadFromDB} style={{color: 'orange'}}>load from db</Button>
      <Button onClick={saveToDB}>save to db</Button>
      <Button onClick={loadFromDisk} style={{color: 'orange'}}>load from disk</Button>
      <Button onClick={saveToDisk}>save to disk</Button>
      <Button onClick={addNew}>add new</Button>
      <Button onClick={removeAll} style={{color: 'darkred'}}>remove all</Button>
      {/* <Button onClick={increaseCount}>+</Button> */}
      {/* <Button onClick={decreaseCount}>-</Button> */}
      {/*  */}
      <Button onClick={getState}>get state</Button>
      <Button onClick={loadToCanvas} style={{color: 'blue'}}>load to canvas</Button>
    </Box>
  )
}

// ==========================================================
// Bear (zustand)

// function BearInfoPanel() {
//   const bears = bearStore((state: any) => state.bears)
//   return <Box>{bears} bears around here ...</Box>
// }

// function BearControlPanel() {
//   const increaseBearCount = bearActions((state: any) => state.increaseBearCount)
//   return <Button onClick={increaseBearCount}>add a bear</Button>
// }

// ==========================================================

export default ThreeDControlPanels
